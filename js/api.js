const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';


var CardAPI = document.getElementById('CardAPI');

document.addEventListener('DOMContentLoaded', () => {
    const CardAPI = document.getElementById('CardAPI'); // Certifique-se de que este elemento existe no DOM
    const CarregarMais = document.getElementById('CarregarMais'); // Botão "Carregar mais"

    if (!CardAPI || !CarregarMais) {
        console.error('Elemento CardAPI ou CarregarMais não encontrado no DOM');
        return;
    }

  
    let offset = 0; // Controle de offset para carregar mais Pokémon

    async function fetchPokemonDetails(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro na requisição inicial');
            }
            const data = await response.json();

            // Array para armazenar as promessas de fetch de cada Pokémon
            const pokemonPromises = data.results.map(async (pokemon) => {
                try {
                    const pokemonResponse = await fetch(pokemon.url);
                    if (!pokemonResponse.ok) {
                        throw new Error(`Erro ao buscar detalhes do Pokémon: ${pokemon.name}`);
                    }
                    const pokemonData = await pokemonResponse.json();

                    console.log(pokemonData);
                    // Cria o conteúdo HTML com os detalhes do Pokémon
                    const pokemonImagem = pokemonData.id.toString().padStart(3, '0');
                    const nomedoPokemon = pokemonData.name.toUpperCase();
                    const imageUrl = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemonImagem}.png`;

                    // Verifica se a imagem foi carregada com sucesso antes de adicionar ao DOM
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = imageUrl;
                        img.onload = () => {
                            const content = {
                                id: pokemonData.id,
                                html: `
                                    <input type="checkbox" id="switch" />
                                    <label class="flip-container" for="switch">
                                        <div class="flipper">
                                            <div class="front">
                                                <div class="card" style="width: 20rem; height: 25rem;">
                                                    <img class="card-img-top" src="${imageUrl}" alt="${pokemonData.name}"><br>
                                                    <h5 class="card-title">Nome: ${nomedoPokemon}</h5>
                                                </div>
                                            </div>
                                            <div class="back">
                                                <div class="card" style="width: 20rem; height: 25rem;">
                                                    <h5 class="card-title">Nome: ${nomedoPokemon}</h5>
                                                    <p class="card-text">Tipo: ${pokemonData.types[0].type.name}</p>
                                                    <p class="card-text">Ataque: ${pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat} <img class="item-batalha" src="../img/espada.png"></p>
                                                    <p class="card-text">Ataque Especial: ${pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat} <img class="item-batalha" src="../img/atk-especial.png"></p>
                                                    <p class="card-text">Defesa: ${pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat} <img class="item-batalha" src="../img/shield.png"></p>
                                                    <p class="card-text">Vida: ${pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat * 10} <img class="item-batalha" src="../img/coracao.png"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                `
                            };
                            resolve(content);
                        };
                        img.onerror = () => {
                            console.error(`Erro ao carregar a imagem para o Pokémon: ${pokemonData.name}`);
                            // Resolve com um conteúdo de fallback ou apenas com o ID para manter a ordenação
                            resolve({
                                id: pokemonData.id,
                                html: `
                                <input type="checkbox" id="switch" />
                                <label class="flip-container" for="switch">
                                    <div class="flipper">
                                        <div class="front">
                                            <div class="card" style="width: 20rem; height: 25rem;">
                                                <img class="card-img-top" src="${imageUrl}" alt="${pokemonData.name}"><br>
                                                <h5 class="card-title">Nome: ${nomedoPokemon}</h5>
                                            </div>
                                        </div>
                                        <div class="back">
                                            <div class="card" style="width: 20rem; height: 25rem;">
                                                <h5 class="card-title">Nome: ${nomedoPokemon}</h5>
                                                <p class="card-text">Tipo: ${pokemonData.types[0].type.name}</p>
                                                <p class="card-text">Ataque: ${pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat} <img class="item-batalha" src="../img/espada.png"></p>
                                                <p class="card-text">Ataque Especial: ${pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat} <img class="item-batalha" src="../img/atk-especial.png"></p>
                                                <p class="card-text">Defesa: ${pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat} <img class="item-batalha" src="../img/shield.png"></p>
                                                <p class="card-text">Vida: ${pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat * 10} <img class="item-batalha" src="../img/coracao.png"></p>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                `
                            });
                        };
                    });
                } catch (error) {
                    console.error(error);
                    return Promise.resolve(null); // Retorna null se ocorrer um erro para continuar o processamento
                }
            });

            // Aguarda que todas as promessas sejam resolvidas
            const allPokemonData = (await Promise.all(pokemonPromises)).filter(pokemon => pokemon !== null);
            // Ordena os Pokémon pelo ID
            allPokemonData.sort((a, b) => a.id - b.id);
            // Adiciona o conteúdo HTML ao elemento CardAPI
            allPokemonData.forEach(pokemon => {
                CardAPI.innerHTML += pokemon.html;
            });

        } catch (error) {
            console.error('Ocorreu um erro:', error);
        } 
    }

    function CarregarPokemon() {
        // Atualiza a URL com o offset atual
        const url = `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`;
        fetchPokemonDetails(url);
        offset += 40; 
    }

    // Inicializa o carregamento dos primeiros Pokémon
    CarregarPokemon();

    // Adiciona o evento de clique ao botão "Carregar mais"
    CarregarMais.addEventListener('click', CarregarPokemon);
});



function AjustadorPesquisar(event) {
    event.preventDefault();
    var apresentacaoSugestao = document.getElementById("suggestionsList");

    const pokemonName = document.getElementById('pokemonInput').value.trim(); 

    if (pokemonName !== '') {
        SugestaoProcura(pokemonName);
        searchPokemon(pokemonName);
        apresentacaoSugestao.style.display="flex";
    } else {
        
        location.reload();
    }
}


function searchPokemon(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    var apresentacaoSugestao = document.getElementById("suggestionsList");
    apresentacaoSugestao.style.display="flex";
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado, verifique nossas sugestões.');
            }
            return response.json();
        })
        .then(pokemonData => {

            PokemonRetornados(pokemonData);
            apresentacaoSugestao.style.display="none";

            return pokemonData; })
        .then(pokemonData => {

            SugestaoProcura(pokemonName, pokemonData.id);
            apresentacaoSugestao.style.display="none";

        })
        .catch(error => {
            alert(error.message);
        })}


function PokemonRetornados(pokemonData){
    var pokemonImagem;
    
            if (pokemonData.id <10) {
                pokemonImagem = '00' + pokemonData.id;} 
            else if(pokemonData.id <100){
                pokemonImagem = '0'+ pokemonData.id;
            }
            else {
                pokemonImagem = pokemonData.id;
            }
            // Exibe os detalhes do Pokémon
            const nomedoPokemon = pokemonData.name.toUpperCase();
            const pokemonEncontrado = `
            
            <input type="checkbox" id="switch" />
            <label class="flip-container" for="switch" >
                <div class="flipper" >
                    <div class="front">
                        <div class="card" style="width: 20rem; height: 25rem;">
                        <img  class="card-img-top" src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemonImagem}.png" alt="${pokemonData.name}"><br>     
                        <h5 class="card-title">Nome: ${nomedoPokemon}</h5>
                        </div>
                    </div>
                    <div class="back">
                        <div class="card" style="width: 20rem; height: 25rem;">
                        <h5 class="card-title">Nome: ${nomedoPokemon}</h5>
                        <p class="card-text">Tipo: ${pokemonData.types[0].type.name}</p>                            
                        <p class="card-text">Ataque: ${pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                        <p class="card-text">Ataque Especial: ${pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</p>
                        <p class="card-text">Defesa: ${pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                        <p class="card-text">Vida: ${pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat * 10}</p>     
                        </div>
                     </div>
                </div>
            </label> `;
            document.getElementById('pokemonEncontrado').innerHTML = pokemonEncontrado;
        }

        function SugestaoProcura(pokemonName) {
            const url = `https://pokeapi.co/api/v2/pokemon/?limit=1000`;
        
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar sugestões de Pokémon.');
                    }
                    return response.json();
                })
                .then(data => {
                    const pokemonList = data.results.map(pokemon => pokemon.name);
                    const suggestions = pokemonList.filter(name => name.includes(pokemonName.toLowerCase()) && name !== pokemonName.toLowerCase());
        
                    if (suggestions.length === 0) {
                        throw new Error('Nenhum Pokémon encontrado.');
                    }
        
                    showSuggestions(suggestions);
                })
                .catch(error => {
                    console.error('Erro:', error);
                    // Aqui você pode adicionar código para exibir uma mensagem amigável ao usuário, informando que nenhum Pokémon foi encontrado
                });
        }
        
        function showSuggestions(suggestions) {
            const suggestionsList = document.getElementById('suggestionsList');
            suggestionsList.innerHTML = '';
        
            suggestions.forEach(suggestion => {
                const listItem = document.createElement('li');
                listItem.textContent = "|" +suggestion+ "|";
                listItem.addEventListener('click', () => {
                    document.getElementById('pokemonInput').value = suggestion;
                    suggestionsList.innerHTML = '';
                    suggestionsList.style.display="none";
                });
                suggestionsList.appendChild(listItem);
            });

            
        }
        
        document.getElementById('searchForm').addEventListener('submit', AjustadorPesquisar);

