
// Cartões padrões
var list = [
    {"pokemon": "Cww","categoria":"Chama","tipo":"Fogo","PrincipalFraq":"Água","Vida":"100","Ataque":"10","Defesa":"20","AtkPrincipal":"10","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/071.png"},
    {"pokemon": "Charizard","categoria":"Chama","tipo":"Fogo","PrincipalFraq":"Água","Vida":"400","Ataque":"50","Defesa":"50","AtkPrincipal":"70","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png"},
    {"pokemon": "Nidoqueen","categoria":"Broca","tipo":"Veneno","PrincipalFraq":"Água","Vida":"600","Ataque":"60","Defesa":"60","AtkPrincipal":"50","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/031.png"},
    {"pokemon": "Poliwhirl","categoria":"Girino","tipo":"Água","PrincipalFraq":"Grama","Vida":"200","Ataque":"10","Defesa":"10","AtkPrincipal":"10","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/061.png"},
];

var vilao = [
  {"pokemon": "Rattata","categoria":"Rato","tipo":"Normal","PrincipalFraq":"Brigando","Vida":"200","Ataque":"40","Defesa":"30","AtkPrincipal":"20","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png"},
  {"pokemon": "Siri","categoria":"Carangueijo do rio","tipo":"Água","PrincipalFraq":"Grama","Vida":"200","Ataque":"70","Defesa":"60","AtkPrincipal":"20","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/098.png"},
  {"pokemon": "Alakazam","categoria":"Psi","tipo":"Psiquico","PrincipalFraq":"Fantasma","Vida":"400","Ataque":"30","Defesa":"30","AtkPrincipal":"80","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/065.png"},
  {"pokemon": "Gengar","categoria":"Sombra","tipo":"Fantasma","PrincipalFraq":"Fantasma","Vida":"400","Ataque":"40","Defesa":"40","AtkPrincipal":"80","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png"},
  {"pokemon": "Dragonite","categoria":"Dragão","tipo":"Dragão","PrincipalFraq":"Fada","Vida":"600","Ataque":"80","Defesa":"60","AtkPrincipal":"60","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png"},
  {"pokemon": "Mew","categoria":"Novas espécies","tipo":"Psiquico","PrincipalFraq":"Fantasma","Vida":"600","Ataque":"60","Defesa":"60","AtkPrincipal":"60","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png"},
];


recarregaCartoes(list);
var Selecionado={};




// Função para inicializar a lista a partir do localStorage, caso exista
function baseLista() {
    var iniciaLista = localStorage.getItem("list");
    if (iniciaLista) {
      list = JSON.parse(iniciaLista);
    
    }
  }
  
  function salvaDadosLocal() {
    var jsondados = JSON.stringify(list);
    localStorage.setItem("list", jsondados);  
    
  }

  
baseLista();
  

function recarregaCartoes(itemCartao) {
    var inicio = '<br>';
    for (var key in itemCartao) {
        inicio += '  <div class="card" style="width: 18rem;"><img src="'+itemCartao[key].imagem+'" class="card-img-top" alt="'+itemCartao[key].pokemon+'"><div class="card-bord"><h5 class="card-title">'+itemCartao[key].pokemon+'</h5> <button type="button" class="btn btn-primary"  onclick="SelecionarCartao('+key+')">Selecionar</button><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="VisualizarCartao('+key+')">Visualizar</button><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalEditar" onclick="EditarCartao('+key+')">Editar</button> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ExemploModalCentralizado"  onclick="excluirCartao('+key+')">Excluir</button></div></div>';
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

   

    list.unshift({"pokemon":nome,"categoria":categoria,"tipo":tipo,"PrincipalFraq":prifraq,"Vida":vida,"Ataque":ataque,"Defesa":defesa,"AtkPrincipal":atqprincipal,"imagem":url});

    salvaDadosLocal(list);
    
    recarregaCartoes(list);

    alert("Pokemon Adicionado!")
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
    <p class="InfoCard"><strong>Imagem:</strong> <img class="img-pokemon"src="${dadosCartao.imagem}" alt="Imagem Pokemon"</p>

 
  `;

  modalContent.innerHTML = content;

    // $('#exampleModal').modal('show');
    
  }
}


function EditarCartao(key) {
  // Obter os dados do cartão a ser editado
    dadosCartao = list[key];
  var modalContent = document.getElementById("EditPokemons");
  // Criar o conteúdo do modal com base nos dados do cartão
  const content = `
    
  <form id="EdicaoCards">
  <p><strong>Nome:</strong> <input type="text" id="editarNome" value="${dadosCartao.pokemon}"></p>
  <p><strong>Tipo:</strong> <input type="text" id="editarTipo" value="${dadosCartao.tipo}"></p>
  <p><strong>Categoria:</strong> <input type="text" id="editarCategoria" value="${dadosCartao.categoria}"></p>
  <p><strong>Principal Fraqueza:</strong> <input type="text" id="editarPrincipalFraq" value="${dadosCartao.PrincipalFraq}"></p>
  <p><strong>Vida:</strong> <input type="text" id="editarVida" value="${dadosCartao.Vida}"></p>
  <p><strong>Ataque:</strong> <input type="text" id="editarAtaque" value="${dadosCartao.Ataque}"></p>
  <p><strong>Ataque Principal:</strong> <input type="text" id="editarAtaquePrincipal" value="${dadosCartao.AtkPrincipal}"></p>
  <p><strong>Defesa:</strong> <input type="text" id="editarDefesa" value="${dadosCartao.Defesa}"></p>
  <p><strong>Imagem:</strong> <input type="text" id="editarImagem" value="${dadosCartao.imagem}"></p>
</form>
<button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onclick="SalvarEdicao(${key})">Salvar</button>
     
  `;
  

  modalContent.innerHTML = content;

  // // Exibir o modal
  // $('#ModalEditar').modal('show');
}

function SalvarEdicao(key) {
  var form = document.getElementById("EdicaoCards");
  var editCard = {
    pokemon: form.elements["editarNome"].value,
    tipo: form.elements["editarTipo"].value,
    categoria: form.elements["editarCategoria"].value,
    PrincipalFraq: form.elements["editarPrincipalFraq"].value,
    Vida: form.elements["editarVida"].value,
    Ataque: form.elements["editarAtaque"].value,
    AtkPrincipal: form.elements["editarAtaquePrincipal"].value,
    Defesa: form.elements["editarDefesa"].value,
    imagem: form.elements["editarImagem"].value
  };

  // Atualizar os dados do cartão na lista
  list[key] = editCard;

  // Recarregar os cartões na interface
  recarregaCartoes(list);

  // // Fechar o modal
  // $('#ModalEditar').modal('hide');
}






function excluirCartao(key) {
  var Excluir = document.getElementById("excluirCartao");
  Excluir.addEventListener("click", function() {
      // Verifica se o botão foi clicado
      if (Excluir) {
          if (key === list.length - 1) {
              list.pop();
          } else if (key === 0) {
              list.shift();
          } else {
              var listIni = list.slice(0, key);
              var listFim = list.slice(key + 1);
              list = listIni.concat(listFim);
          }
          recarregaCartoes(list);
          console.log(list);
      }
    
  });
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
    <p>Nome: ${dadosSelecionado.pokemon}</p>
    <p class="InfoCard">Imagem: <img class="img-pokemon" src="${dadosSelecionado.imagem}" alt="Imagem Pokemon"</p>
    <p>Tipo: ${dadosSelecionado.tipo}</p>
    <p>Atk : ${dadosSelecionado.Ataque}</p>
    <p>Atk Esp. : ${dadosSelecionado.AtkPrincipal}</p>
    <p>Def : ${dadosSelecionado.Defesa}</p>
    <p>Vida: ${Hpjogador} / ${dadosSelecionado.Vida}</p>
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
        
    </div>
  `;

  CardSelecionado.innerHTML = content;

  console.log("Card selecionado:", Selecionado);

  LiberarCombate();
};


LiberarCombate(); 

  function LiberarCombate() {
    var inicioBatalha = document.getElementById("combate");

    // Verificar se o objeto Selecionado está vazio
    if (Object.keys(Selecionado).length === 0) {
        inicioBatalha.style.pointerEvents = "none";
        inicioBatalha.style.opacity = "0.5";
        inicioBatalha.style.color = "red";
    } else {
        inicioBatalha.style.pointerEvents = "auto";
        inicioBatalha.style.opacity = "1";
        inicioBatalha.style.color = ""; 
    }
}
 
  



var vilaoAtual = 0;
var HpVilao = 0;

function ApresentacaoVilao(){
  var CardVilao = document.getElementById("Cardvilao");
  var dadosVilao = vilao[vilaoAtual]; // Acesso ao vilão específico pelo índice

  const content = `
    <p>Nome: ${dadosVilao.pokemon}</p>
    <p class="InfoCard">Imagem: <img class="img-pokemon" src="${dadosVilao.imagem}" alt="Imagem Pokemon"</p>
    <p>Tipo: ${dadosVilao.tipo}</p>
    <p>Atk: ${dadosVilao.Ataque}</p>
    <p>Atk Esp. : ${dadosVilao.AtkPrincipal}</p>
    <p>Def: ${dadosVilao.Defesa}</p>
    <p>Vida: ${HpVilao} / ${dadosVilao.Vida}</p>

    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 500%;" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div> <br>
    </div>
    <button id="ProximoAdv" style="display:none">PROXIMO ADVERSARIO</button>
  `;

  CardVilao.innerHTML = content;

  proximaBatalha();
}


// INICIAR BATALHA 

document.getElementById("IniciarBatalha").addEventListener("click", Batalha);
document.getElementById("Ataque").addEventListener("click", Atacar);
document.getElementById("AtaqueEspec").addEventListener("click", Especial);
document.getElementById("Defesa").addEventListener("click", Defender);





var Hpjogador = 0;
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
  vidaJogador = Selecionado[0].Vida;
  
} else {
  console.log("Nenhum card selecionado.");
}



function Batalha(event) {
console.log("Batalha iniciada");
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


SelecionarCartao();
proximaBatalha();
ContinuidadeBatalha(HpVilao , Hpjogador);
}

function Atacar(event) {
  
  var idBotao = event.target.id;
  var suaAcao = '';
  var Oponente = '';
 

  console.log("Ataque realizado!");
// ação adversario (variados)
    var acao = [1,2,3];
    var variacao = Math.floor(Math.random()* acao.length);
    var AcaoOponente = acao[variacao];
// ação usuario (determinado pelo botão)
console.log(AcaoOponente);

    if (idBotao === "Ataque" && (AcaoOponente == 1 || AcaoOponente == 3)) {
        if (AcaoOponente == 1) {

            suaAcao = "Você deu dano de " + AtaquePokemon ;
            Oponente = "Inimigo deu dano de " + infoVilao[0];

            HpVilao -= AtaquePokemon;
            Hpjogador -= infoVilao[0];
        }
        if (AcaoOponente == 3) {
            suaAcao ="Você deu dano de " +AtaquePokemon;
            Oponente ="Você tomou Ataque Especial de " + infoVilao[2];
          
            HpVilao -= AtaquePokemon;
            Hpjogador -= infoVilao[2];
          }
    }
    if (idBotao === "Ataque" && AcaoOponente == 2) {

          suaAcao = "Você deu dano de " +AtaquePokemon;
          Oponente = "Seu adversario defendeu " + infoVilao[1];

          HpVilao -= ( AtaquePokemon - infoVilao[1]);
    }
    
    console.log(Hpjogador);
   
    atualizarVidaOponente(HpVilao);
    atualizarVidaJogador(Hpjogador);
    ContinuidadeBatalha (HpVilao , Hpjogador)
    HistoricoBatalha(suaAcao , Oponente);
  }

  function Defender(event){

    var idBotao = event.target.id;
    var suaAcao = '';
    var Oponente = '';
    

    // ação adversario (variados)
        var acao = [1,2,3];
        var variacao = Math.floor(Math.random()* acao.length);
        var AcaoOponente = acao[variacao];
    // ação usuario (determinado pelo botão)
    console.log(AcaoOponente);
    
    if (idBotao === "Defesa" && (AcaoOponente == 1 || AcaoOponente == 3)) {
        if (AcaoOponente == 1) {
            suaAcao = "Você Defendeu " +DefesaPokemon;
             Oponente = "Inimigo deu dano de " + infoVilao[0];

            if (DefesaPokemon < infoVilao[0]){
          
              Hpjogador -= (DefesaPokemon - infoVilao[0]);
            
             
          }
          
            console.log(Hpjogador);
            console.log(HpVilao);
      }
        if (AcaoOponente == 3) {

          suaAcao = "Você Defendeu " +DefesaPokemon;
          Oponente = "Inimigo deu Ataque Especial de " + infoVilao[2];

           if (DefesaPokemon < infoVilao[2]){
          
            Hpjogador -= (DefesaPokemon - infoVilao[2]);
          
          }

          console.log(Hpjogador);
          console.log(HpVilao);
        }
       }
    if (idBotao === "Defesa" && AcaoOponente == 2) {
      
        suaAcao = "Você Defendeu";
        Oponente = "Inimigo Defendeu"


        console.log(Hpjogador);
        console.log(HpVilao);

      }

      console.log(Hpjogador);
   atualizarVidaOponente(HpVilao);
    atualizarVidaJogador(Hpjogador);
    ContinuidadeBatalha (HpVilao , Hpjogador)
    HistoricoBatalha(suaAcao , Oponente);
    }

  function Especial(event){

    var idBotao = event.target.id;
    var suaAcao = '';
    var Oponente = '';
  
    // ação adversario (variados)
        var acao = [1,2,3];
        var variacao = Math.floor(Math.random()* acao.length);
        var AcaoOponente = acao[variacao];
    // ação usuario (determinado pelo botão)
    console.log(AcaoOponente);
    if (idBotao === "AtaqueEspec" && (AcaoOponente == 1 || AcaoOponente == 3)) {
        if (AcaoOponente == 1) {
            suaAcao = "Você Utilizou Ataque Especial e causou dano" +AtqEspecialPokemon;
            Oponente = "Inimigo deu dano de " + infoVilao[0];

            HpVilao -= AtqEspecialPokemon;
            Hpjogador -= infoVilao[0];

            console.log(Hpjogador);
            console.log(HpVilao);

        }
        if (AcaoOponente == 3) {
          suaAcao = "Você Utilizou Ataque Especial e causou dano" +AtqEspecialPokemon;
          Oponente = "Inimigo Utilizou Ataque Especial de " + infoVilao[2];


          HpVilao -= AtqEspecialPokemon;
          Hpjogador -= infoVilao[2];

          console.log(Hpjogador);
          console.log(HpVilao);
        }
    }
    if (idBotao === "AtaqueEspec" && AcaoOponente == 2) {

      suaAcao = "Você Utilizou Ataque Especial e causou dano" +AtqEspecialPokemon;
      Oponente = "Inimigo defendeu " +infoVilao[1];

      HpVilao -= (AtqEspecialPokemon - infoVilao[1]);

      console.log(Hpjogador);
      console.log(HpVilao);
    }

    console.log(Hpjogador);
    atualizarVidaOponente(HpVilao);
    atualizarVidaJogador(Hpjogador);
    ContinuidadeBatalha (HpVilao , Hpjogador)
    HistoricoBatalha(suaAcao , Oponente);
}


function atualizarVidaOponente(NovoValor){
  HpVilao = NovoValor;
  
  if(HpVilao <= 0){
    HpVilao = 0
  }
  
  
  ApresentacaoVilao();
}

function atualizarVidaJogador(NovoValor){
  Hpjogador = NovoValor;

    if(Hpjogador <= 0){
      Hpjogador = 0
    }

  SelecionarCartao();
}

function proximaBatalha(){
  ProximoAdv = document.getElementById("ProximoAdv");
  
  if (HpVilao === 0){
    ProximoAdv.style.display = "block";
  }
      ProximoAdv.addEventListener("click", function() {
      vilaoAtual++;
      console.log("testesteste3", vilaoAtual);
      Batalha();
      ApresentacaoVilao();
      ContinuidadeBatalha();
    })
}

function ContinuidadeBatalha(HpVilao, Hpjogador) {
 jogador = Hpjogador;
 adversario = HpVilao;
 botoes = document.getElementById("Botoes");

  if (jogador <= 0) {
      botoes.style.pointerEvents = "none";
      botoes.style.opacity = "0.5";
      setTimeout(function() {
          alert("Você foi derrotado!");
      }, 100);
  } else if (adversario <= 0) {
      console.log("Você Venceu! Parabéns!");
      botoes.style.pointerEvents = "none";
      botoes.style.opacity = "0.5";
  } else {
      botoes.style.pointerEvents = "auto";
      botoes.style.opacity = "1";
  }
}



function HistoricoBatalha(suaAcao, Oponente) {
  var Historiabatalha = document.getElementById('historico');
  
  // Criar elemento de lista para a ação do jogador
  var itemListaJogador = document.createElement('li');
  itemListaJogador.textContent = `Sua Ação: ${suaAcao}`;
  Historiabatalha.appendChild(itemListaJogador);

  // Criar elemento de lista para a ação do oponente
  var itemListaOponente = document.createElement('li');
  itemListaOponente.textContent = `Ação do Oponente: ${Oponente}`;
  Historiabatalha.appendChild(itemListaOponente);
}

document.addEventListener('DOMContentLoaded', function() {
  const pokemonSelecionado = JSON.parse(localStorage.getItem('pokemonSelecionado'));
  if (pokemonSelecionado) {
      if (pokemonSelecionado != 0) {
          // Pokémon é um inimigo
          vilao.push(pokemonSelecionado);
      } else {
          // Pokémon é um aliado
          list.push(pokemonSelecionado);
      }
      // Limpa o item do localStorage após adicionar o Pokémon à lista
      localStorage.removeItem('pokemonSelecionado');
  }
});




document.addEventListener("DOMContentLoaded", function() {
  ApresentacaoVilao();
});

recarregaCartoes(list);

