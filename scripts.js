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
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
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
    var modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = ''; // Clear existing modal content

    var modal = document.createElement('div');
    modal.classList.add('modal');

    var closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', hideModal);

    var nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    var imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = pokemon.imageUrl;
    imageElement.alt = pokemon.name;

    modal.appendChild(closeButton);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}

function hideModal() {
    var modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
}

document.querySelector('#show-modal').addEventListener('click', function() {
    showModal();
});

document.querySelector('#modal-container').addEventListener('click', function(e) {
    var target = e.target;
    if (target === this) {
        hideModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.querySelector('#modal-container').classList.contains('is-visible')) {
        hideModal();
    }
});

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        addListItem(pokemon);
    });
});
