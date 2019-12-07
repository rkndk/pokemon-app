import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import MyPokemonListPage from "./pages/MyPokemonListPage";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={PokemonListPage}/>
                    <Route path="/detail/:name" component={PokemonDetailPage}/>
                    <Route path="/collected" component={MyPokemonListPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
