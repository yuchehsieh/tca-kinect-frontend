import React from "react";

import './Home.css';
import {Link} from "react-router-dom";
import {routePath} from "../utils/constants";

function Home() {

    return (
        <div className="Home-Container">
            <Link to={routePath.Result}>
                <div className="Start">
                    START 尋找數位替身吧！
                </div>
            </Link>
        </div>
    );
}

export default Home;
