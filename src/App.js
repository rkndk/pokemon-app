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
                    <Route exact path="/">
                        <PokemonListPage/>
                    </Route>
                    <Route path="/detail/:name">
                        <PokemonDetailPage/>
                    </Route>
                    <Route path="/collected">
                        <MyPokemonListPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
