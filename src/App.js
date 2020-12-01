import React from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import './App.css';
import { routePath } from './utils/constants'
import Result from "./pages/Result";
import Home from "./pages/Home";
import Mobile from "./pages/Mobile";

function App() {

    return (
        <div className="App" onContextMenu={(e)=> e.preventDefault()}>
            <Router>
                <Switch>
                    <Route exact path={routePath.Result} component={Result}/>
                    <Route exact path={routePath.Home} component={Home}/>
                    <Route exact path={`${routePath.Mobile}/:url`} component={Mobile}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
