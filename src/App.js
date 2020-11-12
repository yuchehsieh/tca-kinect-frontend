import React, {useState, useEffect} from "react";
import axios from 'axios';
import QRCode from "react-qr-code";

import './App.css';

function App() {

    const [images, setImages] = useState([]);


    const fetchImages = async () => {
        const response = await axios({
            method: 'get',
            url: 'https://api.imgur.com/3/album/nM0DMMs/images',
            headers: {
                'Authorization': 'Client-ID d614e7ae6ec0a06'
            }
        });
        let images = response.data.data;
        console.log(images);
        setImages(images);
    };

    useEffect(() => {
        setInterval(() => {
            fetchImages();
        }, 5000)
    }, []);

    let qrcode = images.length >= 1
        ? images[images.length-1].link
        : "";

    console.log(qrcode);

    return (
        <div className="App">

            <div className="Container">


                <div className="Left">

                    <div
                        style={{
                            width: "40vw",
                            height: "40vh",
                            background: `url(${images[images.length-1]?.link}) center center / cover no-repeat`,
                            backgroundSize: 'cover'
                        }}
                    />

                </div>


                <div className="Right">


                    {
                        images.length >= 1
                        &&
                        <QRCode value={qrcode}/>
                    }


                </div>


            </div>
        </div>
    );
}

export default App;
