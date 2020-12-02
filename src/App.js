import React from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import * as firebase from 'firebase';

import './App.css';
import { routePath } from './utils/constants'
import Result from "./pages/Result";
import Home from "./pages/Home";
import Mobile from "./pages/Mobile";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "tca-kinect.firebaseapp.com",
    databaseURL: "https://tca-kinect.firebaseio.com",
    projectId: "tca-kinect",
    storageBucket: "tca-kinect.appspot.com",
    messagingSenderId: "1026813776648",
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-9LL4F8FZEM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
export const imagesRef = db.collection("images");

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
