import React, { useState } from 'react';
import RatingRow from './rating_row';
import styled from 'styled-components';
import { Container, Button } from '../../styled_components';
import { AddRating } from '../../add_place';
import CommonImageSlider, { FALLBACK_IMAGE } from '../../CommonImageSlider';

const PlaceCardConatiner = styled(Container)`
    color: #333;
    background-color: #adadad;
    border-radius: 2px;
    margin-bottom: 10px;
    font-size: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    transition: 0.5s;
`,
    PlaceCardImageContainer = styled(Container)`
    width: 100px;
    height: 100px;
    display: inline-block;
    align-self: center;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 1px 1px 0.25px;

`,
    PlaceCardDetails = styled(Container)`
    display: inline-flex;
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 2px 4px;
`;
export default function PlaceCard({ element, showRating, toggleRating, showAlert, addRating }) {
    const [showRatingPopup, toggleRatingPopup] = useState(false);
    return <>
        <CommonImageSlider show={showRating} imagesArray={element && 'photo' in element ? element.photo : []} />
        <PlaceCardConatiner >
            <PlaceCardConatiner onClick={() => toggleRating()}>
                <PlaceCardImageContainer>
                    <img style={{ width: '100%', height: '100%' }} src={element.photo ? element.photo : FALLBACK_IMAGE} alt={"icon" + element.index} />
                </PlaceCardImageContainer>
                <PlaceCardDetails>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <h3 style={{ fontSize: 20, margin: 0 }}>{element.name} </h3>
                        <span style={{ color: 'red', fontSize: 16, fontWeight: '900', textShadow: '0px 0px 2px yellow' }}>
                            {element.averageRating}
                        </span>
                    </div>
                    <div>
                        <p style={{ margin: 2, fontSize: 14 }}> Address: </p>
                        <p style={{ margin: 2, fontSize: 14 }}>{element.address}</p>
                    </div>
                </PlaceCardDetails>
            </PlaceCardConatiner>
            <div style={{
                maxHeight: showRating ? 100 : 0,
                borderTop: '1px solid rgba(51, 51, 51,0.5)',
                width: '100%',
                transition: '0.3s',
                overflowX: 'hidden'
            }}>
                {!!element && !!element.ratings && element.ratings.map((rate, index) => <RatingRow key={index} rate={rate} />)}
                <Button onClick={() => toggleRatingPopup(true)} style={{ width: '100%', fontSize: 15, color: 'white', backgroundColor: '#333' }}>Rate Your Self</Button>
            </div>
        </PlaceCardConatiner>
        <AddRating show={showRatingPopup} onAddClick={(message, stars) => {
            addRating(message, stars, element.index);
            toggleRatingPopup(false);
            showAlert("Thank You Giving Feedback")
        }} onCloseClick={() => toggleRatingPopup(false)} />
    </>
}