import React, {useState, useEffect} from "react";
import axios from 'axios';
import QRCode from "react-qr-code";
import {useHistory} from 'react-router-dom';

import './Result.css';
import {routePath, site_url, url_prefix} from "../utils/constants";

function Result() {

    const history = useHistory();

    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchImages = async () => {
        const response = await axios({
            method: 'get',
            url: 'https://api.imgur.com/3/album/nM0DMMs/images',
            headers: {
                'Authorization': 'Client-ID d614e7ae6ec0a06'
            }
        });
        let images = response.data.data;
        setImages(images);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const onAlbumImageClick = (imageURL) => {
        setIsModalOpen(true);
        setSelectedImage(imageURL);
    };

    const onBackToHome = async () => {
        history.push(routePath.Home);
        // setIsModalOpen(false);
    };

    if (images.length < 1) {
        return null
    }

    return (
        <div className="Container">

            <div className="Big-Title">
                挑選你的數位分身
            </div>

            {
                Array.from(Array(16)).map((item, index) => {
                    let currentImage = images[images.length - 1 - index];
                    return (
                        <div className="Fix-Element" key={index}>
                            <div
                                onClick={() => onAlbumImageClick(currentImage.link)}
                                style={{
                                    width: "80%",
                                    height: "90%",
                                    background: `url(${currentImage?.link}) center center / contain no-repeat`
                                }}
                            />
                        </div>
                    )
                })
            }

            <div className={`Backdrop ${isModalOpen ? "Show" : ""}`} onClick={() => setIsModalOpen(false)}>

                <div className={`Backdrop-Container ${isModalOpen ? "Show" : ""}`} onClick={(e) => {
                    e.stopPropagation()
                }}>

                    <div className="Left">


                        <div
                            style={{
                                width: "70%",
                                height: "80%",
                                background: `url(${selectedImage}) center center / contain no-repeat`,
                            }}
                        />


                    </div>


                    <div className="Right">

                        <QRCode value={ConcatQRcodeString(selectedImage)}/>

                        <div className="Button" onClick={onBackToHome}>
                            回到主畫面
                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}

const ConcatQRcodeString = (imageURL) => {
    if (!imageURL) {
        return ""
    }
    let cutURL = imageURL.substring(url_prefix.length);
    return site_url + routePath.Mobile + '/' + cutURL;
};

export default Result;
