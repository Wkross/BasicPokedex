// Set global values
let currentPokemonData = {
    id: undefined,
    name: undefined,
    picture: undefined,
    type1: undefined,
    type2: undefined
};
let pokemonEntry;

// Base URL
const URL = 'https://pokeapi.co/api/v2/pokemon/';

// Get DOM elements
const pokemonInfoEntry = document.getElementById('pokemon-entry');

const searchStatus = document.getElementById('search-status');

const pokemonInfoContainer = document.getElementById('pokemon-info-container');
const pokemonPicture = document.getElementById('pokemon-picture');
const pokemonIsInTeamPicture = document.getElementById('pokemon-is-in-team');
const pokemonName = document.getElementById('pokemon-name');
const pokemonInfo = document.getElementById('pokemon-info');

const pokemonStats = document.getElementsByClassName('pokemon-stat');
const pokemonTypes = document.getElementsByClassName('pokemon-type');

const pokemonOptionsContainer = document.getElementById('pokemon-options-container');

// // start turning off DOM elements
turnDOMElement(pokemonInfoContainer, CONSTANT.BY_DISPLAY, CONSTANT.TURN_OFF);
turnDOMElement(pokemonOptionsContainer, CONSTANT.BY_DISPLAY, CONSTANT.TURN_OFF);

// Add button event
// Best way to add an event with params
pokemonInfoEntry.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});

// Add event to search buttons
const previousPokemonBtn = document.getElementById('previous-pokemon-btn');
previousPokemonBtn.addEventListener('click', function () { searchAdjacentPokemon(CONSTANT.PREVIOUS) });

const nextPokemonBtn = document.getElementById('next-pokemon-btn');
nextPokemonBtn.addEventListener('click', function () { searchAdjacentPokemon(CONSTANT.NEXT) });

const manageTeamPokemonBtn = document.getElementById('manage-team-btn');
manageTeamPokemonBtn.addEventListener('click', addPokemonCallBack);

function searchPokemon () {
    // Update id value
    pokemonEntry = pokemonInfoEntry.value;

    // Fetch test using Pokemon API
    searchPokemonFetch(pokemonEntry);

    // Clear the textbox
    clearInput(pokemonInfoEntry);
}

function searchAdjacentPokemon (newPokemonPosition) {
    // Update id value
    const newPokemonEntry = (newPokemonPosition == CONSTANT.PREVIOUS) ? currentPokemonData.id - 1 : currentPokemonData.id + 1;
    
    // Fetch test using Pokemon API
    searchPokemonFetch(newPokemonEntry);

    // Clear the textbox
    clearInput(pokemonInfoEntry);
}

function searchPokemonFetch (pokemonEntry) {
    const NEW_URL = `${URL}${pokemonEntry.toString().toLowerCase()}`;     
    fetch(NEW_URL)
        .then(response => response.json())
        .then(data => {
            // Clear data
            currentPokemonData = {
                id: undefined,
                name: undefined,
                picture: undefined,
                type1: undefined,
                type2: undefined
            };

            // turn DOM elements
            turnDOMElement(searchStatus, CONSTANT.BY_DISPLAY, CONSTANT.TURN_OFF);
            turnDOMElement(pokemonInfoContainer, CONSTANT.BY_DISPLAY, CONSTANT.TURN_ON, 'flex');
            turnDOMElement(pokemonOptionsContainer, CONSTANT.BY_DISPLAY, CONSTANT.TURN_ON, 'flex');

            // Set name and number info into the DOM
            pokemonPicture.src = data.sprites.other['official-artwork'].front_default;
            pokemonName.innerHTML = `${pascalCaseWord(data.species.name)} #${data.id}`;

            // Set stats info into the DOM
            CONSTANT.POKEMON_STATS.forEach((stat, index) => {
                pokemonStats[index].innerHTML = `${stat} ${data.stats[index].base_stat}`;
            });

            // Set type(s) info into the DOM
            pokemonTypes[0].innerHTML = ` ${pascalCaseWord(data.types[0].type.name)}`;
            setTypeStyle(pokemonTypes[0], pascalCaseWord(data.types[0].type.name));

            try {
                turnDOMElement(pokemonTypes[1], CONSTANT.BY_DISPLAY, CONSTANT.TURN_ON, 'inline-block');
                pokemonTypes[1].innerHTML = ` ${pascalCaseWord(data.types[1].type.name)}`;
                setTypeStyle(pokemonTypes[1], pascalCaseWord(data.types[1].type.name));

                currentPokemonData.type2 = pascalCaseWord(data.types[1].type.name);
            } catch {
                turnDOMElement(pokemonTypes[1], CONSTANT.BY_DISPLAY, CONSTANT.TURN_OFF);
            }
            
            // Update current pokemonData
            currentPokemonData.id = data.id,
            currentPokemonData.name = pascalCaseWord(data.species.name),
            currentPokemonData.picture = data.sprites.other['official-artwork'].front_default,
            currentPokemonData.type1 = pascalCaseWord(data.types[0].type.name)

            // Set star
            setPokemonInTeamDOM(data.id);
            // Change button
            changeManagePokemonButton();
       })
        .catch(error => {
            // Update current pokemonId
            currentPokemonData = {
                id: 'NONE',
                name: 'NONE',
                picture: 'NONE',
                type1: 'NONE',
                type1: 'NONE'
            }

            // turn DOM elements
            turnDOMElement(searchStatus, CONSTANT.BY_DISPLAY, CONSTANT.TURN_ON, 'block');            
            turnDOMElement(pokemonInfoContainer, CONSTANT.BY_DISPLAY, CONSTANT.TURN_OFF);
            turnDOMElement(pokemonOptionsContainer, CONSTANT.BY_DISPLAY, CONSTANT.TURN_OFF);

            searchStatus.innerHTML = `The search <span style="font-weight:bold">"${pokemonEntry}"</span> has been not found, try again.`;
        })
        .finally (() => {
            // Whatever the result, the record will be updated
            updateRecord(CONSTANT.ADD);
        });
}

function updateRecord (action) {
    switch (action) {
        case CONSTANT.ADD:
            // Validate if the pokemon is in record
            const isInRecord = findPokemonInTeam(currentPokemonData.id, POKEMON_RECORD);
            if (!isInRecord) {
                POKEMON_RECORD.push({
                    id: currentPokemonData.id,
                    name: currentPokemonData.name,
                    picture: currentPokemonData.picture,
                    type1: currentPokemonData.type1,
                    type2: currentPokemonData.type2
                });
            }
            break;
        case CONSTANT.DELETE:
            // NOT USED YET
            break;
    }
}

function managePokemonInTeam (action) {
    switch (action) {
        case CONSTANT.ADD:
            const isInTeam = findPokemonInTeam(currentPokemonData.id, POKEMON_TEAM);
            // Not duplicates
            if (!isInTeam) {
                POKEMON_TEAM.push({
                    id: currentPokemonData.id,
                    name: currentPokemonData.name,
                    picture: currentPokemonData.picture,
                    type1: currentPokemonData.type1,
                    type2: currentPokemonData.type2
                });
            }
            break;
        case CONSTANT.DELETE:
            POKEMON_TEAM.splice(getIndexElementInArray(currentPokemonData.id, POKEMON_TEAM), 1);
            // NOT USED YET
            break;
    }

    // Set star
    setPokemonInTeamDOM(currentPokemonData.id);
    changeManagePokemonButton();
}

function changeManagePokemonButton () {
    const isInTeam = findPokemonInTeam(currentPokemonData.id, POKEMON_TEAM);
    if (!isInTeam) {
        // change events
        manageTeamPokemonBtn.addEventListener('click', addPokemonCallBack);
        manageTeamPokemonBtn.removeEventListener('click', deletePokemonCallBack);
        
        manageTeamPokemonBtn.textContent = 'Add Pokemon to team'
    } else {
        // change events
        manageTeamPokemonBtn.removeEventListener('click', addPokemonCallBack);        
        manageTeamPokemonBtn.addEventListener('click', deletePokemonCallBack);
        
        manageTeamPokemonBtn.textContent = 'Remove from team'
    }
}

function addPokemonCallBack () {
    // Function to get a callback with params wich can be remove or add
    managePokemonInTeam(CONSTANT.ADD);
}

function deletePokemonCallBack () {
    // Function to get a callback with params wich can be remove or add
    managePokemonInTeam(CONSTANT.DELETE);
}

function showMainElements (obj) {
    turnDOMElement(obj.show, CONSTANT.BY_DISPLAY, CONSTANT.TURN_ON);
    turnDOMElement(obj.hide, CONSTANT.BY_DISPLAY, CONSTANT.TURN_OFF);
}

// Not used function
function addPokemonToTable () {
    const pokemonTable = document.getElementById('pokemon-table-body');
    if (POKEMON_TEAM.length == 0) {
 
    } else {
        for (let i = 0; i < POKEMON_TEAM.length; i++) {
            const pokemonData = POKEMON_TEAM[i];
    
            const newTRNode = document.createElement('tr');
            pokemonTable.appendChild(newTRNode);
            
            const newTDNode = document.createElement('td');
            newTRNode.appendChild(newTDNode);
    
            newTDNode.innerText = pokemonData.id;
        }
    }
}

//-------------------
// TOOLS            |
//-------------------

function pascalCaseWord (word) {
    let wordArray = word.split('');
    let firstLetterUpperCase = wordArray[0].toUpperCase();
    wordArray[0] = firstLetterUpperCase;

    return wordArray.join('');
}

function clearInput (input) {
    input.value = '';
}

function findPokemonInTeam (pokemonIdToSearch, arrayTarget) {
    // Find if a pokemon is in a particular team
    for (let i = 0; i < arrayTarget.length; i++) {
        if (arrayTarget[i].id === pokemonIdToSearch) {
            return true;
        }
    }
    return false;
}

function setPokemonInTeamDOM (pokemonId) {
    const isInTeam = findPokemonInTeam(pokemonId, POKEMON_TEAM);

    if (isInTeam) {
        // turn on the star
        turnDOMElement(pokemonIsInTeamPicture, CONSTANT.BY_VISIBILITY, CONSTANT.TURN_ON);
    } else {
        // turn off the star
        turnDOMElement(pokemonIsInTeamPicture, CONSTANT.BY_VISIBILITY, CONSTANT.TURN_OFF);
    }
}

function setTypeStyle (target, type) {
    // Set style using its types
    target.style['background'] = TYPE_STYLES[type].style['background'];
    target.style['border-top-color'] = TYPE_STYLES[type].style['border-top-color'];
    target.style['border-bottom-color'] = TYPE_STYLES[type].style['border-bottom-color'];
}

function turnDOMElement (element, methodToTurn, status, newDisplay='inline-block') {
    switch(methodToTurn) {
        case CONSTANT.BY_VISIBILITY:
            switch(status) {
                case CONSTANT.TURN_ON:
                    element.style.visibility = 'visible';
                    break
                case CONSTANT.TURN_OFF:
                    element.style.visibility = 'hidden';
                    break
            }
            break
        case CONSTANT.BY_DISPLAY:   
            switch (status) {
                case CONSTANT.TURN_ON:
                    element.style.display = newDisplay;
                    break
                case CONSTANT.TURN_OFF:
                    element.style.display = 'none';
                    break
            }
            break
    }
}

function getIndexElementInArray (element, arrayTarget) {
    for (let i = 0; i < arrayTarget.length; i++) {
        if (arrayTarget[i] == element) return i;
    }
}