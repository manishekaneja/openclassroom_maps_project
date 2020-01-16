import React, { useEffect, useState } from 'react';
import ImageSlider from './ImageSlider';
const FALLBACK_IMAGE = 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';

export {
    FALLBACK_IMAGE
}
export default function CommonImageSlider({ show, imagesArray }) {

    const [imageIndexToShow, updateIndexOfImage] = useState(0);
    useEffect(() => {
        updateIndexOfImage(0);
        if (imagesArray && imagesArray.length > 1) {
            const imageChangeIntervel = setInterval(() =>
                updateIndexOfImage(previousIndex =>
                    (previousIndex + 1) % imagesArray.length),
                1000);

            return () => clearInterval(imageChangeIntervel)
        }
    }, [imagesArray]);
    return <>
        <ImageSlider count={imageIndexToShow} show={show} >
            <div className="head" ></div>
            <div className="content">
                {imagesArray && imagesArray.length > 0 ? imagesArray.map((imageUrl, index) => <img src={imageUrl} key={index} alt={`Selected ${index + 1} of your selected one`} />) : <img src={FALLBACK_IMAGE} alt={"Default"} />}
            </div>
            <div className="foot"></div>
        </ImageSlider>
    </>;
}