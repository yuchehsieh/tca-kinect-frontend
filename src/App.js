import React from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import './App.css';
import { routePath } from './utils/constants'
import Result from "./pages/Result";
import Home from "./pages/Home";

function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path={routePath.Result} component={Result}/>
                    <Route exact path={routePath.Home} component={Home}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
