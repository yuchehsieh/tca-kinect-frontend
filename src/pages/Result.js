import React, {useState, useEffect} from "react";
import axios from 'axios';
import QRCode from "react-qr-code";
import { useHistory } from 'react-router-dom';

import './Result.css';
import {routePath, site_url, url_prefix} from "../utils/constants";
import Swal from "sweetalert2";

function Result() {

    const history = useHistory();

    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [email, setEmail] = useState("");

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

    const onChange = (e) => {
        setEmail(e.target.value)
    };

    const onAlbumImageClick = (imageURL) => {
        setIsModalOpen(true);
        setSelectedImage(imageURL);
    };

    const onSendEmail = async () => {
        setIsModalOpen(false);

        const result = await Swal.fire({
            title: 'Success!',
            text: "成功寄出照片到你 Email！",
            icon: 'success',
            // showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: '回到主畫面'
        });

        if (result.value) {
            history.push(routePath.Home);
        }
    };

    if (images.length < 1) {
        return null
    }

    return (
        <div className="Container">

            <div className="Big-Title">
                挑選一張喜歡的！
            </div>

            <div className="Flex-Element">
                <div
                    onClick={() => onAlbumImageClick(images[images.length - 1]?.link)}
                    style={{
                        width: "30vw",
                        height: "30vh",
                        background: `url(${images[images.length - 1]?.link}) center center / contain no-repeat`,
                    }}
                />
            </div>

            <div className="Flex-Element">
                <div
                    onClick={() => onAlbumImageClick(images[images.length - 2]?.link)}
                    style={{
                        width: "30vw",
                        height: "30vh",
                        background: `url(${images[images.length - 2]?.link}) center center / contain no-repeat`,
                    }}
                />
            </div>

            <div className="Flex-Element">
                <div
                    onClick={() => onAlbumImageClick(images[images.length - 3]?.link)}
                    style={{
                        width: "30vw",
                        height: "30vh",
                        background: `url(${images[images.length - 3]?.link}) center center / contain no-repeat`,
                    }}
                />
            </div>


            <div className={`Backdrop ${isModalOpen ? "Show" : ""}`} onClick={() => setIsModalOpen(false)}>

                <div className={`Backdrop-Container ${isModalOpen ? "Show" : ""}`} onClick={(e) => {
                    e.stopPropagation()
                }}>

                    <div className="Left">


                        <div
                            style={{
                                width: "30em",
                                height: "25em",
                                background: `url(${selectedImage}) center center / contain no-repeat`,
                            }}
                        />


                    </div>


                    <div className="Right">

                        <QRCode value={ConcatQRcodeString(selectedImage)}/>

                        <label>留下你的 Email，我們將把照片 Email 給你</label>
                        <input
                            value={email}
                            type="email"
                            onChange={onChange}
                        />


                        <div className="Button" onClick={onSendEmail}>
                            確認
                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}

const ConcatQRcodeString = (imageURL) => {
    if(!imageURL) {
        return ""
    }
    let cutURL = imageURL.substring(url_prefix.length);
    return site_url + routePath.Mobile + '/' + cutURL;
};

export default Result;
