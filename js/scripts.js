var pokemonRepository = (function () {
    var pokemonList = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

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

function addListItem(pokemon) {
    var pokemonList = document.querySelector('.pokemon-list');
    var listItem = document.createElement('li');
    listItem.classList.add('list-group-item'); // Bootstrap list-group-item class
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary', 'pokemon-button'); // Bootstrap button classes
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
        showDetails(pokemon);
    });
}

function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
        showModal(pokemon);
    });
}

function showModal(pokemon) {
    var modalTitle = document.querySelector('.modal-title');
    var modalBody = document.querySelector('.modal-body');
    var modalImage = document.querySelector('.modal-image');

    modalTitle.innerText = pokemon.name;
    modalBody.innerText = 'Height: ' + pokemon.height;
    modalImage.src = pokemon.imageUrl;
    modalImage.alt = pokemon.name;

    $('#exampleModal').modal('show'); // Bootstrap modal show method
}

document.querySelector('#modal-close').addEventListener('click', function() {
    $('#exampleModal').modal('hide'); // Bootstrap modal hide method
});

document.querySelector('#modal-container').addEventListener('click', function(e) {
    var target = e.target;
    if (target === this) {
        $('#exampleModal').modal('hide'); // Bootstrap modal hide method
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && $('#exampleModal').hasClass('show')) {
        $('#exampleModal').modal('hide'); // Bootstrap modal hide method
    }
});

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        addListItem(pokemon);
    });
});
