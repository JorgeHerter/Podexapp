
//here is the IIFE function
var pokemonRepository = (function () {
    var pokemonList = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    //define fuctions add and getall
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    //fetching the pokemon list fron the API
    function loadList() {
        return fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                data.results.forEach(function(item) {
                    var pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(function(error) {
                console.error('Error loading Pokémon list:', error);
            });
    }
    //fetch specific details of the specific pokemon
    function loadDetails(pokemon) {
        var url = pokemon.detailsUrl;
        return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                pokemon.imageUrl = data.sprites.front_default;
                pokemon.height = data.height;
            })
            .catch(function(error) {
                console.error('Error loading Pokémon details:', error);
            });
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();
//create and append pokemon list items
function addListItem(pokemon) {
    var pokemonList = document.querySelector('.pokemon-list');
    var listItem = document.createElement('li');
    var button = document.createElement('#button1');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
        showDetails(pokemon);
    });
}
//logging the pokemon details to the console
function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
        console.log(pokemon);
    });
}
//calling the pokemon repository
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        addListItem(pokemon);
    });
});