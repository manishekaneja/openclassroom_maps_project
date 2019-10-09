import React, { useState } from 'react';
import RatingRow from './rating_row';
import styled from 'styled-components';
import { Container, Button } from '../../styled_components';
import { AddRating } from '../../add_place';
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
width:100px;
height: 100px;
display: inline-block;

`,
    PlaceCardDetails = styled(Container)`
    display: inline-flex;
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 2px 4px;
`;
export default function PlaceCard({ element, showRating, toggleRating, addRating }) {
    const [showRatingPopup, toggleRatingPopup] = useState(false);
    return <>
        <PlaceCardConatiner >
            <PlaceCardConatiner onClick={() => toggleRating()}>
                <PlaceCardImageContainer>
                    <img style={{ width: '100%', height: '100%' }} src="https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt={"Default Omage"} />
                </PlaceCardImageContainer>
                <PlaceCardDetails>
                    <h3 style={{ fontSize: 20, margin: 0 }}>{element.restaurantName}</h3>
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
        }} onCloseClick={() => toggleRatingPopup(false)} />
    </>
}