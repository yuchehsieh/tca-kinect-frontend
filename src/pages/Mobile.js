import React, {useState} from "react";

// import './Home.css';
import {useParams} from "react-router-dom";
import {routePath, site_url, url_prefix} from "../utils/constants";

function Mobile() {

    const [didLoad, setDidLoad] = useState(false);
    const {url} = useParams();

    console.log(url);

    const style = didLoad ? {width: "100vw", height: '100%'} : {visibility: 'hidden'};

    return (
        <div>
            <img
                src={url_prefix + url}
                onLoad={() => setDidLoad(true)}
                style={style}
            />
        </div>
    );
}

export default Mobile;
