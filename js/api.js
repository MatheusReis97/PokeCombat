const url = 'https://pokeapi.co/api/v2/pokemon?limit=4';


var CardAPI = document.getElementById('CardAPI');

// Faz uma solicitação à URL da API
fetch(url)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(pokemonData => {
                    // Cria o conteúdo HTML com os detalhes do Pokémon
                        if(pokemonData.id <100){
                            pokemonImagem = '0'+ pokemonData.id;
                        }if (pokemonData.id <10) {
                            pokemonImagem = '00' + pokemonData.id;
                        } else {
                            pokemonImagem = pokemonData.id;
                        }
                    const content = `
                        <div class="card" style="width: 18rem;">
                        <p>Imagem: <img  class="card-img-top" src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemonImagem}.png" alt="${pokemonData.name}"></p>
                        <div class="card-body">
                        <h5 class="card-title">Nome: ${pokemonData.name}</h5>
                        <p class="card-text">Tipo: ${pokemonData.types[0].type.name}</p>                            
                        <p class="card-text">Ataque: ${pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                        <p class="card-text">Ataque Especial: ${pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</p>
                        <p class="card-text">Defesa: ${pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                        <p class="card-text">Vida: ${pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat * 10}</p> 
                        </div>
                        </div>`;
                
                    // Adiciona o conteúdo HTML ao elemento CardAPI
                    CardAPI.innerHTML += content;
                })
        })
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });


function AjustadorPesquisar(event) {
    event.preventDefault();

    const pokemonName = document.getElementById('pokemonInput').value.trim(); 

    if (pokemonName !== '') {
        SugestaoProcura(pokemonName);
        searchPokemon(pokemonName);
    } else {
        alert('Por favor, insira o nome do Pokémon.'); 
    }
}


function searchPokemon(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado.'); // Lança um erro se o Pokémon não for encontrado
            }
            return response.json();
        })
        .then(pokemonData => {

            PokemonRetornados(pokemonData);


            return pokemonData; })
        .then(pokemonData => {

            SugestaoProcura(pokemonName, pokemonData.id);

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
            const pokemonEncontrado = `
            <div class="card" style="width: 18rem;">
            <p>Imagem: <img  class="card-img-top" src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemonImagem}.png" alt="${pokemonData.name}"></p>
            <div class="card-body">
            <h5 class="card-title">Nome: ${pokemonData.name}</h5>
            <p class="card-text">Tipo: ${pokemonData.types[0].type.name}</p>                            
            <p class="card-text">Ataque: ${pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
            <p class="card-text">Ataque Especial: ${pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</p>
            <p class="card-text">Defesa: ${pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
            <p class="card-text">Vida: ${pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat * 10}</p> 
            </div>
            </div>`;
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
                listItem.textContent = suggestion;
                listItem.addEventListener('click', () => {
                    document.getElementById('pokemonInput').value = suggestion;
                    suggestionsList.innerHTML = '';
                });
                suggestionsList.appendChild(listItem);
            });

            console.log("TESTE SHOW Suggestions");
        }
        
        document.getElementById('searchForm').addEventListener('submit', AjustadorPesquisar);

