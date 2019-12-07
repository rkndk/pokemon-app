const pokemonReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POKEMON':
            state.push(action.pokemon);
            return state;
        case 'REMOVE_POKEMON':
            state = state.filter(i => i.id !== action.id);
            return state;
        default:
            return state;
    }
};

export default pokemonReducer;