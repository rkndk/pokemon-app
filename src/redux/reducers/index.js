import pokemonReducer from "./pokemon";
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    pokemon: pokemonReducer
});

export default allReducers;