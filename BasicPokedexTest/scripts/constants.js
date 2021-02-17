const CONSTANT = {
    ADD: "ADD",
    DELETE: 'DELETE',
    NEXT: 'NEXT',
    PREVIOUS: 'PREVIOUS',
    TURN_ON: 'TURN_ON',
    TURN_OFF: 'TURN_OFF',
    BY_VISIBILITY: 'BY_VISIBILITY',
    BY_DISPLAY: 'BY_DISPLAY',
    POKEMON_STATS: [
        'Base HP:',
        'Base Attack:',
        'Base Defense:',
        'Base Special Attack:',
        'Base Special Defense:',
        'Base Speed:'
    ]
};

const POKEMON_RECORD = [];

const POKEMON_TEAM = [];

const TYPE_STYLES = {
    'Normal': {
        name: 'Normal',
        style: {
            'background': '#A8A878',
            'border-top-color': '#D8D8D0',
            'borde-bottom-color': '#705848'
        }
    },
    'Fire': {
        name: 'Fire',
        style: {
            'background': '#F08030',
            'border-top-color': '#F8D030',
            'border-bottom-color': '#C03028'
        }
    },
    'Water': {
        name: 'Water',
        style: {
            'background': '#6890F0',
            'border-top-color': '#98D8D8',
            'border-bottom-color': '#807870'
        }
    },
    'Electric': {
        name: 'Electric',
        style: {
            'background': '#F8D030',
            'border-top-color': '#F8F878',
            'border-bottom-color': '#B8A038'
        }
    },
    'Grass': {
        name: 'Grass',
        style: {
            'background': '#78C850',
            'border-top-color': '#C0F860',
            'border-bottom-color': '#588040'
        }
    },
    'Flying': {
        name: 'Flying',
        style: {
            'background': '#A890F0',
            'border-top-color': '#C8C0F8',
            'border-bottom-color': '#705898' 
        }
    },
    'Rock': {
        name: 'Rock',
        style: {
            'background': '#B8A038',
            'border-top-color': '#E0C068',
            'border-bottom-color': '#886830'
        }
    },
    'Steel': {
        name: 'Steel',
        style: {
            'background': '#B8B8D0',
            'border-top-color': '#D8D8C0',
            'border-bottom-color': '#807870'
        }
    },
    'Ground': {
        name: 'Ground',
        style: {
            'background': '#E0C068',
            'border-top-color': '#F8F878',
            'border-bottom-color': '#886830'
        }
    },
    'Bug': {
        name: 'Bug',
        style: {
            'background': '#A8B820',
            'border-top-color': '#D8E030',
            'border-bottom-color': '#A8B820'
        }
    },
    'Poison': {
        name: 'Poison',
        style: {
            'background': '#A040A0',
            'border-top-color': '#D880B8',
            'border-bottom-color': '#483850'   
        }
    },
    'Ice': {
        name: 'Ice',
        style: {
            'background': '#98D8D8',
            'border-top-color': '#D0F8E8',
            'border-bottom-color': '#9090A0' 
        }
    },
    'Fighting': {
        name: 'Fighting',
        style: {
            'background': '#C03028',
            'border-top-color': '#F08030',
            'border-bottom-color': '#484038'
        }
    },
    'Psychic': {
        name: 'Psychic',
        style: {
            'background': '#F85888',
            'border-top-color': '#F8C0B0',
            'border-bottom-color': '#789010'
        }
    },
    'Dark': {
        name: 'Dark',
        style: {
            'background': '#705848',
            'border-top-color': '#A8A878',
            'border-bottom-color': '#484038'  
        }
    },
    'Ghost': {
        name: 'Ghost',
        style: {
            'background': '#705898',
            'border-top-color': '#A890F0',
            'border-bottom-color': '#483850'
        }
    },
    'Dragon': {
        name: 'Dragon',
        style: {
            'background': '#7038F8',
            'border-top-color': '#B8A0F8',
            'border-bottom-color': '#483890'
        }
    },
    'Fairy': {
        name: 'Fairy',
        style: {
            'background': '#f820bb',
            'border-top-color': '#B8A0F8',
            'border-bottom-color': '#483890'   
        }
    }
}
