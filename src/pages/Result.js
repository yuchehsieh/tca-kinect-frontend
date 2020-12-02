import React, {useState, useEffect} from "react";
import axios from 'axios';
import QRCode from "react-qr-code";
import {useHistory} from 'react-router-dom';
import {FaArrowDown} from 'react-icons/fa';

import './Result.css';
import {routePath, site_url, test_site_url, url_prefix} from "../utils/constants";

let timer;

const TIMEOUT = 60;

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

        appendTimer();

    }, []);

    const appendTimer = () => {
        timer = window.setTimeout(() => {
            console.log("the timer: " + timer + " has been removed");
            history.push(routePath.Home);
        }, TIMEOUT * 1000);
        console.log("append timer: " + timer);
    };

    const removeTimer = () => {
        console.log("remove timer: " + timer);
        window.clearTimeout(timer);
    };

    const onAlbumImageClick = (imageURL) => {
        removeTimer();
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
        <div
            className="Container"
            onScroll={() => {
                removeTimer();
                appendTimer();
            }}
        >

            <div className="Title-Wrapper">
                <div className="Big-Title" onClick={() => fetchImages()}/>
            </div>

            <div className="Element-Wrapper">
                {
                    Array.from(Array(16)).map((item, index) => {
                        let currentImage = images[images.length - 1 - index];
                        return (
                            <div className="Fix-Element" key={currentImage.link}>
                                <div
                                    onClick={() => onAlbumImageClick(currentImage.link)}
                                    style={{
                                        width: "40vw",
                                        height: " calc(40vw * 0.5625 )",
                                        background: `url(${currentImage?.link}) center center / cover no-repeat`,
                                        boxShadow: currentImage?.link ? "10px 10px 5px rgba(255, 255, 255, 0.25)" : ""
                                    }}
                                />

                            </div>
                        )
                    })
                }
            </div>

            <div className={`Backdrop ${isModalOpen ? "Show" : ""}`}
                 onClick={() => {
                     setIsModalOpen(false);
                     appendTimer();
                 }}
            >

                <div className={`Backdrop-Container ${isModalOpen ? "Show" : ""}`} onClick={(e) => {
                    e.stopPropagation()
                }}>

                    <div className="Left">

                        <div
                            style={{
                                width: "70%",
                                height: "80%",
                                background: `url(${selectedImage}) top center / contain no-repeat`,
                                position: 'relative'
                            }}
                        >
                            <div
                                className="arrow bounce"
                                style={{
                                    left: '-90%'
                                }}
                            >
                                <FaArrowDown/>
                            </div>
                            <p
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    bottom: '0',
                                    transform: 'translate(-50%, -50%)',
                                    width: 'fit-content',
                                    fontSize: '2em',
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}
                            >
                                掃描下方 QRCode 到手機上查看
                            </p>
                            <div className="arrow bounce">
                                <FaArrowDown/>
                            </div>
                        </div>
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
    let fullImageURL = site_url + routePath.Mobile + '/' + cutURL;
    return fullImageURL;
};

export default Result;
