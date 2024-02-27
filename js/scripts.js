


let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



function getAll () {
    return pokemonList;
}

function add (pokemon) {
    pokemonList.push(pokemon);
}

const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    cont filteredPokemon = pokemonRepository.getAll().filter(function (pokemon) {
        return pokemon.name.toLowerCase().includes(searchString);
    });

  function addListItem(pokemon) {
    let repository = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    repository.appendChild(listPokemon);
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    button.classList.add('btn', 'btn-md', 'btn-block');

    listPokemon.appendChild(button);
    repository.appendChild(listPokemon);

    button.addEventListener('click', function() {
        showDetails(pokemon);
    });
  } 

  function loadList() {
    return fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (item) {
        let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            imageUrl: null,
            height: null,
            weight: null,
            type: null,
        };
        add(pokemon);
    });
    }).catch(function (e) {
        console.error(e);
    });
    }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
        showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h2>' + pokemon.name + '</h2>');

    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr('src', pokemon.imageUrl);

    let heightElement = $('<p>' + 'height : ' + pokemon.height + ' m' + '</p>');

    let weightElement = $('<p>' + 'weight : ' + pokemon.weight + ' kg' + '</p>');

    let typeElement = $('<p>' + 'type : ' + pokemon.type + '</p>');

    modalTitle.append(nameElement);
    modalTitle.append(imageElement);
    modalTitle.append(heightElement);
    modalTitle.append(weightElement);
    modalTitle.append(typeElement);
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

/*function addListItem(pokemon) {
    var listItem = document.createElement('listItemPokemon');
    listItem.textContent = (pokemon.name + " (height: " + pokemon.height + ")<br>" + " (weight: " + pokemon.weight + ")<br>" (abilities: " + pokemon.abilities + ")<br>");
    document.getElementById('#pokemonList1').appendChild(listItem);
}

pokemonList1.forEach (function(pokemon) {
    addListItem(pokemon);
}

element.addEventListener("click", function () {
    document.getElementById("button1").innerHTML = "Here's Your Pokemon";
});


pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
}); 

let pokemonRepository = (function () {
  
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}

fetch('https://pokeapi.co/api/v2/pokemon/').then(function (response) {
  return response.json(); // This returns a promise!
}).then(function (pokemonList) {
  console.log(pokemonList); // The actual JSON response
}).catch(function () {
  // Error
});

/* function validateEmail() {
  let value = emailInput.value;
  let hasAtSign = value.indexOf('@') > -1;
  let hasDot =  value.indexOf('.') > -1;
  return value && hasAtSign && hasDot;
}*/

/*function validatePassword() {
  let value = passwordInput.value;
  return value && value.length >= 8;
}*/

/* function showErrorMessage(input, message) {
  let container = input.parentElement; // The .input-wrapper

  // Check and Remove any existing errors
  let error = container.querySelector('.error-message');
  if (error) {
    container.removeChild(error);
  }

  // Now add the error if the message isn’t empty
  if (message) {
    let error = document.createElement('div');
    error.classList.add('error-message');
    error.innerText = message;
    container.appendChild(error);
  }
} */