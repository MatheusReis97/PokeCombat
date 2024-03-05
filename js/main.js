
// Cartões padrões
var list = [
    {"num": "3","pokemon": "Charizard","categoria":"Chama","tipo":"Fogo","PrincipalFraq":"Água","Vida":"400","Ataque":"50","Defesa":"50","AtkPrincipal":"70","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png"},
    {"num": "2","pokemon": "Nidoqueen","categoria":"Broca","tipo":"Veneno","PrincipalFraq":"Água","Vida":"600","Ataque":"60","Defesa":"60","AtkPrincipal":"50","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/031.png"},
    {"num": "1","pokemon": "Poliwhirl","categoria":"Girino","tipo":"Água","PrincipalFraq":"Grama","Vida":"400","Ataque":"40","Defesa":"40","AtkPrincipal":"30","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/061.png"},
];

var vilao = [
  {"nivel": "1","pokemon": "Rattata","categoria":"Rato","tipo":"Normal","PrincipalFraq":"Brigando","Vida":"200","Ataque":"40","Defesa":"30","AtkPrincipal":"20","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png"},
  {"nivel": "2","pokemon": "Siri","categoria":"Carangueijo do rio","tipo":"Água","PrincipalFraq":"Grama","Vida":"200","Ataque":"70","Defesa":"60","AtkPrincipal":"20","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/098.png"},
  {"nivel": "3","pokemon": "Alakazam","categoria":"Psi","tipo":"Psiquico","PrincipalFraq":"Fantasma","Vida":"400","Ataque":"30","Defesa":"30","AtkPrincipal":"80","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/065.png"},
  {"nivel": "4","pokemon": "Gengar","categoria":"Sombra","tipo":"Fantasma","PrincipalFraq":"Fantasma","Vida":"400","Ataque":"40","Defesa":"40","AtkPrincipal":"80","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png"},
  {"nivel": "5","pokemon": "Dragonite","categoria":"Dragão","tipo":"Dragão","PrincipalFraq":"Fada","Vida":"600","Ataque":"80","Defesa":"60","AtkPrincipal":"60","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png"},
  {"nivel": "6","pokemon": "Mew","categoria":"Novas espécies","tipo":"Psiquico","PrincipalFraq":"Fantasma","Vida":"600","Ataque":"60","Defesa":"60","AtkPrincipal":"60","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png"},
];

var Selecionado={};




// Função para inicializar a lista a partir do localStorage, caso exista
function baseLista() {
    var iniciaLista = localStorage.getItem("list");
    if (iniciaLista) {
      list = JSON.parse(iniciaLista);
    
    }
  }
  
  // Função para salvar a lista no localStorage
  function salvaDadosLocal() {
    var jsondados = JSON.stringify(list);
    localStorage.setItem("list", jsondados);  
    
  }

  
baseLista();
  

function recarregaCartoes(itemCartao) {
    var inicio = '<br>';
    for (var key in itemCartao) {
        inicio += '  <div class="card" style="width: 18rem;"><img src="'+itemCartao[key].imagem+'" class="card-img-top" alt="'+itemCartao[key].pokemon+'"><div class="card-bord"><h5 class="card-title">'+itemCartao[key].num+ '-' +itemCartao[key].pokemon+'</h5> <button type="button" class="btn btn-primary"  onclick="SelecionarCartao('+key+')">Selecionar</button><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="VisualizarCartao('+key+')">Visualizar</button><button type="button" class="btn btn-primary" onclick="EditarCartao('+key+')">Editar</button> <button type="button" class="btn btn-primary"onclick="excluirCartao('+key+')">Excluir</a></button></div></div>';
    }
    inicio += '<br>';
    document.getElementById("listaCartoes").innerHTML = inicio;
    salvaDadosLocal(list);  
}



function adicionarCartao() {
    var nome = document.getElementById("nome").value;
    var categoria = document.getElementById("categoria").value;
    var tipo = document.getElementById("tipo").value;
    var prifraq = document.getElementById("fraqueza").value;
    var vida = document.getElementById("vida").value;
    var ataque = document.getElementById("ataque").value;
    var defesa = document.getElementById("defesa").value;
    var atqprincipal = document.getElementById("atqprincipal").value;
    var url = document.getElementById("url").value;

   

    list.unshift({"num":"4","pokemon":nome,"categoria":categoria,"tipo":tipo,"PrincipalFraq":prifraq,"Vida":vida,"Ataque":ataque,"Defesa":defesa,"AtkPrincipal":atqprincipal,"imagem":url});

    salvaDadosLocal(list);
    
    recarregaCartoes(list);

    alert("Pokemon Adicionado!")
}
  
function excluirCartao(key){
 
    if(confirm("Você deseja realmente EXCLUIR o jogo?")){
        if(key===list.length-1){
            list.pop();
        }else if(key === 0){
            list.shift();
        }else{
            var listIni = list.slice(0,key);
            var listFim = list.slice(key+1);
            list=listIni.concat(listFim);
        }
        recarregaCartoes(list);
        console.log(list);
    }
    }



function EditarCartao(key){
  dadosCartao = list[key];
  var modalContent = document.getElementById("DadosPokemons");

  document.getElementById("NomePoke").value=dadosCartao.pokemon;
  document.getElementById("TipoPoke").value=dadosCartao.tipo;
  document.getElementById("CategoriaPoke").value=dadosCartao.categoria;
  document.getElementById("PrincipalFraqPoke").value=dadosCartao.PrincipalFraq;
  document.getElementById("VidaPoke").value=dadosCartao.Vida;
  document.getElementById("AtaquePoke").value=dadosCartao.Ataque;
  document.getElementById("AtaquePrincipalPoke").value=dadosCartao.AtkPrincipal;
  document.getElementById("ImagemPoke").value=dadosCartao.imagem;

  modalContent.innerHTML = content;

    $('#exampleModal').modal('show');
  }

function SelecionarCartao(key) {

  var CardSelecionado = document.getElementById("CardSelecionado");
 

    // Verifique se o índice é válido
    if (key >= 0 && key < list.length) {
        // slice para criar uma cópia da lista e enviar para Selecionado
        Selecionado = list.slice(key);
    }
 
  //  apresentação do Selecionado
     var dadosSelecionado = Selecionado[0];
  const content = `
    <h4>Selecionado: Nº ${dadosSelecionado.num}</h4>
    <p>Nome: ${dadosSelecionado.pokemon}</p>
    <p class="InfoCard">Imagem: <img class="img-pokemon" src="${dadosSelecionado.imagem}" alt="Imagem Pokemon"</p>
    <p>Tipo: ${dadosSelecionado.tipo}</p>
    <p>Atk : ${dadosSelecionado.Ataque}</p>
    <p>Atk Esp. : ${dadosSelecionado.AtkPrincipal}</p>
    <p>Def : ${dadosSelecionado.Defesa}</p>

    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  `;

  CardSelecionado.innerHTML = content;

  console.log("Card selecionado:", Selecionado);
}


function VisualizarCartao(key){
  {
    dadosCartao = list[key];
    var modalContent = document.getElementById("DadosPokemons");

    const content = `
    <p class="InfoCard"><strong>Nome:</strong> ${dadosCartao.pokemon}</p>
    <p class="InfoCard"><strong>Tipo:</strong> ${dadosCartao.tipo}</p>
    <p class="InfoCard"><strong>Categoria:</strong> ${dadosCartao.categoria}</p>
    <p class="InfoCard"><strong>Principal Fraqueza :</strong> ${dadosCartao.PrincipalFraq}</p>
    <p class="InfoCard"><strong>Vida:</strong> ${dadosCartao.Vida}</p>
    <p class="InfoCard"><strong>Ataque:</strong> ${dadosCartao.Ataque}</p>
    <p class="InfoCard"><strong>AtaquePrincipal:</strong> ${dadosCartao.AtkPrincipal}</p>
    <p class="InfoCard"><strong>Defesa:</strong> ${dadosCartao.Defesa}</p>
    <p class="InfoCard"><strong>Imagem</strong> <img class="img-pokemon"src="${dadosCartao.imagem}" alt="Imagem Pokemon"</p>

 
  `;

  modalContent.innerHTML = content;

    $('#exampleModal').modal('show');
    
  }
}



var vilaoAtual = 0;

function ApresentacaoVilao() {
  var CardVilao = document.getElementById("Cardvilao");
  var dadosVilao = vilao[vilaoAtual]; // Acesso ao vilão específico pelo índice

  const content = `
    <h4>Nível: ${dadosVilao.nivel}</h4>
    <p>Nome: ${dadosVilao.pokemon}</p>
    <p class="InfoCard">Imagem: <img class="img-pokemon" src="${dadosVilao.imagem}" alt="Imagem Pokemon"</p>
    <p>Tipo: ${dadosVilao.tipo}</p>
    <p>Atk: ${dadosVilao.Ataque}</p>
    <p>Atk Esp. : ${dadosVilao.AtkPrincipal}</p>
    <p>Def: ${dadosVilao.Defesa}</p>

    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 500%;" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  `;

  CardVilao.innerHTML = content;
}


// INICIAR BATALHA 

document.getElementById("IniciarBatalha").addEventListener("click", Batalha);
document.getElementById("Ataque").addEventListener("click", Atacar);
document.getElementById("AtaqueEspec").addEventListener("click", Especial);
document.getElementById("Defesa").addEventListener("click", Defender);


var Hpjogador = 0;
var HpVilao = 0;
var teste = 0;
var AtaquePokemon = 0;
var DefesaPokemon = 0;
var AtqEspecialPokemon = 0;


if (vilaoAtual !== null && vilao[vilaoAtual]) {
  // Obtendo os atributos do card vilão diretamente do objeto
  var infoVilao = [
  vilao[vilaoAtual].Ataque,
  vilao[vilaoAtual].Defesa,
  vilao[vilaoAtual].AtkPrincipal,
  vilao[vilaoAtual].Vida];
  HpVilao = vilao[vilaoAtual].Vida;
} else {
  console.log("Não há inimigo para batalhar");
}

if (Selecionado && Selecionado.length > 0) {
  // Obtendo os atributos do card selecionado diretamente do objeto
  AtaquePokemon = Selecionado[0].Ataque;
  DefesaPokemon = Selecionado[0].Defesa;
  AtqEspecialPokemon = Selecionado[0].AtkPrincipal;
  Hpjogador = Selecionado[0].Vida;
  
} else {
  console.log("Nenhum card selecionado.");
}

function Batalha(event) {
console.log("Batalha iniciada");
  // console.log(HpVilao);
  // console.log(Hpjogador);

  
  // Verificar se o card selecionado foi armazenado corretamente
  if (Selecionado && Selecionado.length > 0) {
      // Obtendo os atributos do card selecionado diretamente do objeto
      AtaquePokemon = Selecionado[0].Ataque;
      DefesaPokemon = Selecionado[0].Defesa;
      AtqEspecialPokemon = Selecionado[0].AtkPrincipal;
      Hpjogador = Selecionado[0].Vida;
      
  } else {
      console.log("Nenhum card selecionado.");
  }
  // Verificar se o card vilão foi armazenado corretamente
  if (vilaoAtual !== null && vilao[vilaoAtual]) {
    // Obtendo os atributos do card vilão diretamente do objeto
    var infoVilao = [
    vilao[vilaoAtual].Ataque,
    vilao[vilaoAtual].Defesa,
    vilao[vilaoAtual].AtkPrincipal,
    vilao[vilaoAtual].Vida];
    HpVilao = vilao[vilaoAtual].Vida;
} else {
    console.log("Não há inimigo para batalhar");
}
}

function Atacar(event) {
  
  var idBotao = event.target.id;

  console.log("Ataque realizado!");
// ação adversario (variados)
    var acao = [1,2,3];
    var variacao = Math.floor(Math.random()* acao.length);
    var AcaoOponente = acao[variacao];
// ação usuario (determinado pelo botão)
console.log(AcaoOponente);

    if (idBotao === "Ataque" && (AcaoOponente == 1 || AcaoOponente == 3)) {
        if (AcaoOponente == 1) {

            
            console.log("Você deu dano de " + AtaquePokemon);
            console.log("Inimigo deu dano de " + infoVilao[0]);

            HpVilao -= AtaquePokemon;
            Hpjogador -= infoVilao[0];

            console.log(Hpjogador);
            console.log(HpVilao);

        }
        if (AcaoOponente == 3) {
            console.log("Você deu dano de " +AtaquePokemon);
            console.log("Você tomou Ataque Especial de " + infoVilao[2]);
          
            HpVilao -= AtaquePokemon;
            Hpjogador -= infoVilao[2];

            console.log(Hpjogador);
            console.log(HpVilao);
          }
    }
    if (idBotao === "Ataque" && AcaoOponente == 2) {

          console.log("Você deu dano de " +AtaquePokemon);
          console.log ("Seu adversario defendeu " + infoVilao[1])

          HpVilao -= ( AtaquePokemon - infoVilao[1]);

          console.log(Hpjogador);
          console.log(HpVilao);
    }
  }

  function Defender(event){

    var idBotao = event.target.id;

    
    console.log("Defesa realizada !");

    // ação adversario (variados)
        var acao = [1,2,3];
        var variacao = Math.floor(Math.random()* acao.length);
        var AcaoOponente = acao[variacao];
    // ação usuario (determinado pelo botão)
    console.log(AcaoOponente);
    
    if (idBotao === "Defesa" && (AcaoOponente == 1 || AcaoOponente == 3)) {
        if (AcaoOponente == 1) {
            console.log("Você Defendeu " +DefesaPokemon);
            console.log("Inimigo deu dano de " + infoVilao[0]);

            if (DefesaPokemon < infoVilao[0]){
          
              Hpjogador -= (DefesaPokemon - infoVilao[0]);
            
          }
          
            console.log(Hpjogador);
            console.log(HpVilao);
      }
        if (AcaoOponente == 3) {

          console.log("Você Defendeu " +DefesaPokemon);
          console.log("Inimigo deu Ataque Especial de " + infoVilao[2]);

           if (DefesaPokemon < infoVilao[2]){
          
            Hpjogador -= (DefesaPokemon - infoVilao[2]);
          
          }

          console.log(Hpjogador);
          console.log(HpVilao);
        }
       }
    if (idBotao === "Defesa" && AcaoOponente == 2) {
      
        console.log("Ambos defenderam");


        console.log(Hpjogador);
        console.log(HpVilao);

      }
}

  function Especial(event){

    var idBotao = event.target.id;

    
    console.log("Ataque Especial realizado!");
    // ação adversario (variados)
        var acao = [1,2,3];
        var variacao = Math.floor(Math.random()* acao.length);
        var AcaoOponente = acao[variacao];
    // ação usuario (determinado pelo botão)
    console.log(AcaoOponente);
    if (idBotao === "AtaqueEspec" && (AcaoOponente == 1 || AcaoOponente == 3)) {
        if (AcaoOponente == 1) {
            console.log("Você Utilizou Ataque Especial e causou dano" +AtqEspecialPokemon);
            console.log("Inimigo deu dano de " + infoVilao[0]);

            HpVilao -= AtqEspecialPokemon;
            Hpjogador -= infoVilao[0];

            console.log(Hpjogador);
            console.log(HpVilao);

        }
        if (AcaoOponente == 3) {
          console.log("Você Utilizou Ataque Especial e causou dano" +AtqEspecialPokemon);
          console.log("Inimigo Utilizou Ataque Especial de " + infoVilao[2]);


          HpVilao -= AtqEspecialPokemon;
          Hpjogador -= infoVilao[2];

          console.log(Hpjogador);
          console.log(HpVilao);
        }
    }
    if (idBotao === "AtaqueEspec" && AcaoOponente == 2) {

      console.log("Você Utilizou Ataque Especial e causou dano" +AtqEspecialPokemon);
      console.log("Inimigo defendeu " +infoVilao[1]);

      HpVilao -= (AtqEspecialPokemon - infoVilao[1]);

      console.log(Hpjogador);
      console.log(HpVilao);
    }
}



document.addEventListener("DOMContentLoaded", function() {

  ApresentacaoVilao();
});


recarregaCartoes(list);

