export const addPokemon = (pokemon) => {
    return {
        type: 'ADD_POKEMON',
        pokemon: pokemon,
    };
};

export const removePokemon = (id) => {
    return {
        type: 'REMOVE_POKEMON',
        id: id,
    };
};