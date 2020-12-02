import React, {useState} from "react";

// import './Home.css';
import {useParams} from "react-router-dom";
import {routePath, site_url, url_prefix} from "../utils/constants";

function Mobile() {

    const [didLoad, setDidLoad] = useState(false);
    const {url} = useParams();

    const style = didLoad ? {width: "100vw", height: '100%'} : {visibility: 'hidden'};


    const callToDownload = async () => {
        let imgurURL = url_prefix + url;
        console.log(imgurURL);

        let blob = await fetch(imgurURL).then(r => r.blob());
        const blobURL = window.URL.createObjectURL(new Blob([blob]));

        let link = document.createElement('a');
        link.href = blobURL;
        link.setAttribute('download', `你的數位分身.jpg`);
        document.body.appendChild(link);
        link.click();
        return null;
    };

    return (
        <div>
            <img
                src={url_prefix + url}
                onLoad={() => setDidLoad(true)}
                style={style}
            />
            <div
                onClick={callToDownload}
                style={{
                    border: '1px solid',
                    padding: '1em 1.5em',
                    width: 'fit-content',
                    margin: 'auto',
                    marginTop: '4em',
                    borderRadius: '10px'
                }}
            >
                安卓系統手機
                <br />
                點擊此處下載
            </div>
        </div>
    );
}

export default Mobile;
