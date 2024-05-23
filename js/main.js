
// Cartões padrões
var list = [
    {"pokemon": "Charizard","tipo":"Fogo","Vida":"780","Ataque":"84","Defesa":"78","AtkPrincipal":"109","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png"},
    {"pokemon": "Nidoqueen","tipo":"Veneno","Vida":"600","Ataque":"60","Defesa":"87","AtkPrincipal":"75","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/031.png"},
    {"pokemon": "Poliwhirl","tipo":"Água","Vida":"650","Ataque":"92","Defesa":"65","AtkPrincipal":"50","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/061.png"},
];
baseLista();
var vilao = [
  {"pokemon": "Rattata","tipo":"Normal","Vida":"300","Ataque":"56","Defesa":"35","AtkPrincipal":"25","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png"},
  {"pokemon": "Siri","tipo":"Água","Vida":"300","Ataque":"105","Defesa":"90","AtkPrincipal":"25","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/098.png"},
  {"pokemon": "Alakazam","tipo":"Psiquico","Vida":"550","Ataque":"50","Defesa":"45","AtkPrincipal":"135","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/065.png"},
  {"pokemon": "Arbok","tipo":"Poison","Vida":"600","Ataque":"95","Defesa":"69","AtkPrincipal":"65","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/024.png"},
  {"pokemon": "Gengar","tipo":"Fantasma","Vida":"600","Ataque":"65","Defesa":"60","AtkPrincipal":"130","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png"},
  {"pokemon": "Duraludon","tipo":"Steel","Vida":"700","Ataque":"95","Defesa":"115","AtkPrincipal":"120","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/884.png"},
  {"pokemon": "Dragonite","tipo":"Dragão","Vida":"910","Ataque":"134","Defesa":"95","AtkPrincipal":"100","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png"},
  {"pokemon": "Mew","tipo":"Psiquico","Vida":"1000","Ataque":"100","Defesa":"100","AtkPrincipal":"100","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png"},
  {"pokemon": "Mewtwo","tipo":"Psiquico","Vida":"1060","Ataque":"110","Defesa":"90","AtkPrincipal":"154","imagem":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png"},
];


recarregaCartoes(list);
var Selecionado={};


function salvaDadosLocal() {
  var jsondados = JSON.stringify(list);
  localStorage.setItem("list", jsondados); 
}

// Função para inicializar a lista a partir do localStorage, caso exista
function baseLista() {
    var iniciaLista = localStorage.getItem("list");
    if (iniciaLista) {
      list = JSON.parse(iniciaLista);
    
    }
  }
  


 
baseLista();
  

function recarregaCartoes(itemCartao) {
    var inicio = '<br>';
    for (var key in itemCartao) {
        inicio += '  <div class="card" style="width: 18rem;"><img src="'+itemCartao[key].imagem+'" class="card-img-top" alt="'+itemCartao[key].pokemon+'"><div class="card-bord"><h5 class="card-title">'+itemCartao[key].pokemon+'</h5> <button type="button" class="btn btn-primary"  onclick="SelecionarCartao('+key+')" id="tranca">Selecionar</button><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="VisualizarCartao('+key+')" id="tranca">Visualizar</button><button type="button" class="btn btn-primary" modal-dialog modal-lg data-bs-toggle="modal" data-bs-target="#ModalEditar" onclick="EditarCartao('+key+')" id="tranca">Editar</button> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ExemploModalCentralizado"  onclick="excluirCartao('+key+')" id="tranca">Excluir</button></div></div>';
    }
    inicio += '<br>';
    document.getElementById("listaCartoes").innerHTML = inicio;
    salvaDadosLocal(list);  
}



function adicionarCartao() {



    var nome = document.getElementById("nome").value;
    var tipo = document.getElementById("tipo").value;
    var vida = document.getElementById("vida").value;
    var ataque = document.getElementById("ataque").value;
    var defesa = document.getElementById("defesa").value;
    var atqprincipal = document.getElementById("atqprincipal").value;
    var url = document.getElementById("url").value;

    if (nome === "" || tipo === "" || vida === "" || ataque === "" || defesa === "" || atqprincipal === "" || url === "") {

      

      var customModal = new bootstrap.Modal(document.getElementById("ModalAlerta"));
      document.getElementById("titulo-modal").textContent = "Alerta";
       document.getElementById("texto-modal").textContent = "Por favor, preencha todos os campos antes de adicionar um novo Pokémon.";
        document.getElementById("div-titulo").style.backgroundColor = '#e1d729d4';
          document.getElementById("div-titulo").style.color = 'Black';
      
      


      customModal.show();
      return;
    }

    var novocartao = {"pokemon":nome,"tipo":tipo,"Vida":vida,"Ataque":ataque,"Defesa":defesa,"AtkPrincipal":atqprincipal,"imagem":url}

    list.unshift(novocartao);
    salvaDadosLocal(list);
    
    recarregaCartoes(list);

    alert("Pokemon Adicionado!");

    limpezaAdicionar();
}

function limpezaAdicionar(){
    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("vida").value = "";
    document.getElementById("ataque").value = "";
    document.getElementById("defesa").value = "";
    document.getElementById("atqprincipal").value = "";
    document.getElementById("url").value = "";

  }


function VisualizarCartao(key){
  {
    dadosCartao = list[key];
    var modalContent = document.getElementById("DadosPokemons");

    const content = `
    <p class="InfoCard" ><strong> ${dadosCartao.pokemon} </strong> </p>
    <p class="text-batalha"><strong>Tipo: </strong> ${dadosCartao.tipo}</p>
    <p class="text-batalha"><strong>Vida: </strong> ${dadosCartao.Vida} <img class="item-batalha" src="../img/coracao.png"></p>
    <p class="text-batalha"><strong>Ataque: </strong> ${dadosCartao.Ataque} <img class="item-batalha" src="../img/espada.png"></p>
    <p class="text-batalha"><strong>AtaquePrincipal: </strong> ${dadosCartao.AtkPrincipal} <img class="item-batalha" src="../img/atk-especial.png"></p>
    <p class="text-batalha"><strong>Defesa: </strong> ${dadosCartao.Defesa} <img class="item-batalha" src="../img/shield.png"></p>
    <img class="img-pokemon" id="img-visualizar" src="${dadosCartao.imagem}" alt="Imagem Pokemon">

 
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
 
  
  <form id="EdicaoCards" >
  <br>
  <p><strong>Nome:</strong> <input type="text" id="editarNome" value="${dadosCartao.pokemon}"></p>
  <p><strong>Tipo:</strong> <input type="text" id="editarTipo" value="${dadosCartao.tipo}"></p>
  <p><strong>Vida:</strong> <input type="text" id="editarVida" value="${dadosCartao.Vida}"> <img class="item-batalha" src="../img/coracao.png"> </p>
  <p><strong>Ataque:</strong> <input type="text" id="editarAtaque" value="${dadosCartao.Ataque}"> <img class="item-batalha" src="../img/espada.png"> </p>
  <p><strong>Ataque Principal:</strong> <input type="text" id="editarAtaquePrincipal" value="${dadosCartao.AtkPrincipal}"> <img class="item-batalha" src="../img/atk-especial.png"> </p>
  <p><strong>Defesa:</strong> <input type="text" id="editarDefesa" value="${dadosCartao.Defesa}"> <img class="item-batalha" src="../img/shield.png"> </p>
  <p><strong>Imagem:</strong> <input type="text" id="editarImagem" value="${dadosCartao.imagem}"></p>
  </form>
  <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onclick="SalvarEdicao(${key})">Salvar</button>
  <button type="button" class="btn btn-danger" data-bs-dismiss="modal"> Fechar</button>
 
  `;
  

  modalContent.innerHTML = content;

  // Exibir o modal
  $('#ModalEditar').modal('show');
}

function SalvarEdicao(key) {
  var form = document.getElementById("EdicaoCards");
  var editCard = {
    pokemon: form.elements["editarNome"].value,
    tipo: form.elements["editarTipo"].value,
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
    <p class="text-batalha" style="text-align: center"><strong>Nome:</strong>  ${dadosSelecionado.pokemon}</p>
    <p class="InfoCard"><img class="img-pokemon" src="${dadosSelecionado.imagem}" alt="Imagem Pokemon"</p>
    <p class="text-batalha"><strong>Tipo:</strong>  ${dadosSelecionado.tipo}</p>
    <p class="text-batalha"><strong>Atk :</strong>  ${dadosSelecionado.Ataque} <img class="item-batalha" src="../img/espada.png"></p>
    <p class="text-batalha"><strong>Atk Esp. :</strong>  ${dadosSelecionado.AtkPrincipal} <img class="item-batalha" src="../img/atk-especial.png"></p>
    <p class="text-batalha"><strong>Def :</strong>  ${dadosSelecionado.Defesa} <img class="item-batalha" src="../img/shield.png"></p>
    <p class="text-batalha"><strong>Vida:</strong> ${Hpjogador} / ${dadosSelecionado.Vida} <img class="item-batalha" src="../img/coracao.png"></p>
    <div>
    <progress  value="${Hpjogador}" max="${dadosSelecionado.Vida}"> ${Hpjogador} </progress>
    </div>
  `;

  CardSelecionado.innerHTML = content;


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
    <p class="text-batalha" style="text-align: center"><strong>Nome: </strong>${dadosVilao.pokemon}</p>
    <p class="InfoCard"><img class="img-pokemon" src="${dadosVilao.imagem}" alt="Imagem Pokemon"</p>
    <p class="text-batalha"><strong>Tipo:</strong>  ${dadosVilao.tipo}</p>
    <p class="text-batalha"><strong>Atk:</strong> ${dadosVilao.Ataque} <img class="item-batalha" src="../img/espada.png"> </p>
    <p class="text-batalha"><strong>Atk Esp. :</strong> ${dadosVilao.AtkPrincipal} <img class="item-batalha" src="../img/atk-especial.png"></p>
    <p class="text-batalha"><strong>Def:</strong> ${dadosVilao.Defesa} <img class="item-batalha" src="../img/shield.png"></p>
    <p class="text-batalha"><strong>Vida:</strong> ${HpVilao} / ${dadosVilao.Vida} <img class="item-batalha" src="../img/coracao.png"></p>
    <div>
    <progress class="barra-batalha"  value="${HpVilao}" max="${dadosVilao.Vida}"> ${HpVilao} </progress>
    </div> 
    <button id="ProximoAdv"  type="button" class="btn btn-success" style="display:none">PROXIMO ADVERSARIO</button>
  `;

  CardVilao.innerHTML = content;
   
  proximaBatalha();
}


// INICIAR BATALHA 

document.getElementById("IniciarBatalha").addEventListener("click", Batalha);
document.getElementById("IniciarBatalha").addEventListener("click", TravaBotao);
document.getElementById("Ataque").addEventListener("click", Atacar);
document.getElementById("AtaqueEspec").addEventListener("click", Especial);
document.getElementById("Defesa").addEventListener("click", Defender);





var Hpjogador = 0;
var teste = 0;
var AtaquePokemon = 0;
var DefesaPokemon = 0;
var AtqEspecialPokemon = 0;




var infoVilao = [
  vilao[vilaoAtual].Ataque,
  vilao[vilaoAtual].Defesa,
  vilao[vilaoAtual].AtkPrincipal,
  vilao[vilaoAtual].Vida];
  HpVilao = vilao[vilaoAtual].Vida;




  function atualizarAtributosVilao(vilaoAtual) {
    // Verifica se o vilão atual é válido
    if (vilaoAtual !== null && vilao[vilaoAtual]) {
      // Atualiza os atributos do vilão diretamente
      infoVilao[0] = vilao[vilaoAtual].Ataque;
      infoVilao[1] = vilao[vilaoAtual].Defesa;
      infoVilao[2] = vilao[vilaoAtual].AtkPrincipal;
      infoVilao[3] = vilao[vilaoAtual].Vida;
      HpVilao = vilao[vilaoAtual].Vida;
    
    } 
  }
  
  




function Batalha(event) {

  // Verificar se o card selecionado foi armazenado corretamente
  if (Selecionado && Selecionado.length > 0) {
      // Obtendo os atributos do card selecionado diretamente do objeto
      AtaquePokemon = Selecionado[0].Ataque;
      DefesaPokemon = Selecionado[0].Defesa;
      AtqEspecialPokemon = Selecionado[0].AtkPrincipal;
      Hpjogador = Selecionado[0].Vida;
      
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
  var customModal = new bootstrap.Modal(document.getElementById("ModalAlerta"));
  document.getElementById("titulo-modal").textContent = "PARABÉNS VOCÊ É O MAIOR! ";
  document.getElementById("texto-modal").innerHTML  = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br>";
  document.getElementById("texto-modal").style.color = "white";
  
  document.getElementById("body-modal").style.backgroundImage =  'url(../img/trofeu-campeao.jpg)';
  document.getElementById("body-modal").style.backgroundSize = 'cover'; // ou 'contain', dependendo da preferência
  document.getElementById("body-modal").style.backgroundPosition = 'center'; // ou qualquer outra posição desejada



  customModal.show();
  return;
}

SelecionarCartao();
proximaBatalha();
ContinuidadeBatalha(HpVilao , Hpjogador);
}



function TravaBotao(){
  var inoperar = document.getElementById("listaCartoes");
  var desativar = document.getElementById("IniciarBatalha");
  var alerta = document.getElementById("alerta");


    inoperar.style.pointerEvents ="none";
    desativar.style.pointerEvents = "none";
    inoperar.style.opacity = "0.5";
    desativar.style.opacity = "0.5";
    alerta.style.display = "block";

}

function Desistir(){
  var inoperar = document.getElementById("listaCartoes");
  var desativar = document.getElementById("IniciarBatalha");
  var alerta = document.getElementById("alerta");

  Hpjogador = 0;
  atualizarVidaJogador(Hpjogador);

  inoperar.style.pointerEvents ="auto";
  desativar.style.pointerEvents = "auto";
  inoperar.style.opacity = "1";
  desativar.style.opacity = "1";
  alerta.style.display = "none";
     
}



function Atacar(event) {
  
  var idBotao = event.target.id;
  var suaAcao = '';
  var Oponente = '';
 
// ação adversario (variados)
    var acao = [1,2,3];
    var variacao = Math.floor(Math.random()* acao.length);
    var AcaoOponente = acao[variacao];
// ação usuario (determinado pelo botão)


    if (idBotao === "Ataque" && (AcaoOponente == 1 || AcaoOponente == 3)) {
        if (AcaoOponente == 1) {

            suaAcao = "Você deu dano de " + AtaquePokemon ;
            Oponente = "Inimigo deu dano de " + infoVilao[0];

            HpVilao -= AtaquePokemon;
            Hpjogador -= infoVilao[0];
        }
        if (AcaoOponente == 3) {
            suaAcao ="Você deu dano de " + AtaquePokemon;
            Oponente ="Você tomou Ataque Especial de " + infoVilao[2];
          
            HpVilao -= AtaquePokemon;
            Hpjogador -= infoVilao[2];
          }
    }
    if (idBotao === "Ataque" && AcaoOponente == 2) {

          suaAcao = "Você deu dano de " + AtaquePokemon;
          Oponente = "Seu adversario defendeu " + infoVilao[1];

              if(AtaquePokemon > infoVilao[1]){
          HpVilao = HpVilao - ( AtaquePokemon - infoVilao[1]);
                  }
        };
    
    
   
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
   
    
    if (idBotao === "Defesa" && (AcaoOponente == 1 || AcaoOponente == 3)) {
        if (AcaoOponente == 1) {
            suaAcao = "Você Defendeu " + DefesaPokemon;
             Oponente = "Inimigo deu dano de " + infoVilao[0];

            if (DefesaPokemon < infoVilao[0]){         
              Hpjogador = Hpjogador - (DefesaPokemon - infoVilao[0]);
             
          }
          
            
      }
        if (AcaoOponente == 3) {

          suaAcao = "Você Defendeu " + DefesaPokemon;
          Oponente = "Inimigo deu Ataque Especial de " + infoVilao[2];

           if (DefesaPokemon < infoVilao[2]){
          
            Hpjogador -= (DefesaPokemon - infoVilao[2]);
          
          }

        }
       }
    if (idBotao === "Defesa" && AcaoOponente == 2) {
      
        suaAcao = "Você Defendeu";
        Oponente = "Inimigo Defendeu";



      }

  
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
    
    if (idBotao === "AtaqueEspec" && (AcaoOponente == 1 || AcaoOponente == 3)) {
        if (AcaoOponente == 1) {
            suaAcao = "Você Utilizou Ataque Especial e causou dano " + AtqEspecialPokemon;
            Oponente = "Inimigo deu dano de " + infoVilao[0];

            HpVilao -= AtqEspecialPokemon;
            Hpjogador -= infoVilao[0];


        }
        if (AcaoOponente == 3) {
          suaAcao = "Você Utilizou Ataque Especial e causou dano " + AtqEspecialPokemon;
          Oponente = "Inimigo Utilizou Ataque Especial de " + infoVilao[2];


          HpVilao -= AtqEspecialPokemon;
          Hpjogador -= infoVilao[2];

          
        }
    }
    if (idBotao === "AtaqueEspec" && AcaoOponente == 2) {

      suaAcao = "Você Utilizou Ataque Especial e causou dano " + AtqEspecialPokemon;
      Oponente = "Inimigo defendeu " + infoVilao[1];

      if(AtqEspecialPokemon > infoVilao[1]){
       HpVilao= HpVilao - (AtqEspecialPokemon - infoVilao[1]);
      }
      
    }

    
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
      
      Batalha();
      ApresentacaoVilao();
      ContinuidadeBatalha();
      LimparHistorico();
      atualizarAtributosVilao(vilaoAtual);
    
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
          var customModal = new bootstrap.Modal(document.getElementById("ModalAlerta"));
          document.getElementById("titulo-modal").textContent = "QUE TRISTE ! ";
          document.getElementById("texto-modal").textContent = "Você acabou de ser derrotado pelo nosso adversários! Mais não desista e tente novamente!";
          document.getElementById("div-titulo").style.backgroundColor = 'red';
          document.getElementById("div-titulo").style.color = 'White';
      
          customModal.show();
          return;
      }, 100);
  } else if (adversario <= 0) {
        var customModal = new bootstrap.Modal(document.getElementById("ModalAlerta"));
        document.getElementById("titulo-modal").textContent = "É ISSO AI! ";
        document.getElementById("texto-modal").textContent = "Você acabou de derrotar um dos nossos adversários! Você está indo bem!";
        document.getElementById("div-titulo").style.backgroundColor = 'green';
        document.getElementById("div-titulo").style.color = 'White';

      
        customModal.show();
       
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
  itemListaJogador.classList.add('acao-jogador');
  Historiabatalha.appendChild(itemListaJogador);

  // Criar elemento de lista para a ação do oponente
  var itemListaOponente = document.createElement('li');
  itemListaOponente.textContent = `Ação do Oponente: ${Oponente}`;
  itemListaOponente.classList.add('acao-oponente');
  Historiabatalha.appendChild(itemListaOponente);

}

function LimparHistorico() {
  var historico = document.getElementById('historico');
  while (historico.firstChild) {
      historico.removeChild(historico.firstChild);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  ApresentacaoVilao();
});

recarregaCartoes(list);

