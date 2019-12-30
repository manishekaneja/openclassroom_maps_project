import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrawerHeader } from './drawer_header';
import { Container } from '../../styled_components';
import { DrawerFooter } from './drawer_footer';
import PlaceCard from '../place_card';
const Drawer = styled(Container)`
    height: 100vh;
    background-color: #ccc;
    z-index: 101;
    left:0;
    transition: 0.5s;
    display:flex;
    box-shadow: 0.16px 0.33px 8px whitesmoke;
    flex-direction: column;
    line-height:1.5;
    transistion:1s;
    overflow:hidden
`;

function useHookForSearch(locations) {
    let [locationsArray, updateLocations] = useState(locations);
    let [phrase, updatePhrase] = useState('');
    useEffect(function () {
        updateLocations(locations.filter(function (loc) {
            if (phrase.toString().trim().length === 0) {
                return true;
            }
            return loc.name.toLowerCase().includes(phrase.toString().trim().toLowerCase()) ||
                loc.address.toLowerCase().includes(phrase.toString().trim().toLowerCase())
        }));
    }, [locations, phrase]);
    return { locationsArray, phrase, updatePhrase };
}

export function SideDrawer({ show, closeMenu, locations, showAlert, hideAlert, addRating, markPlace, noMarker, updateCenter }) {
    const {locationsArray, phrase, updatePhrase } = useHookForSearch(locations);
    console.log(">>",locations,locationsArray)
    const [showRating, toggleRating] = useState(0);
    return <Drawer style={{ width: (!show) ? '0px' : '400px' }} className="hide" >
        <DrawerHeader closeMenu={closeMenu} phrase={phrase} updatePhrase={updatePhrase} />
        <div style={{ padding: '20px 10px', flex: 1, overflowY: 'scroll' }}>
            {locationsArray.map((element, index) => {
                console.log(element);
                // return null;
                return <PlaceCard addRating={addRating} updateCenter={updateCenter} key={index} showAlert={showAlert} showRating={showRating === index} toggleRating={() => {
                    noMarker();
                    markPlace(element.index);
                    // updateCenter({ latitude: element.latitude, longitude: element.longitude })
                    toggleRating(selected => index === selected ? -1 : index);
                }} element={element} />
            })}
        </div>
        <DrawerFooter updateCenter={() => {
            updateCenter(false);
            showAlert("Back to Center", "success");
        }} />
    </Drawer>
}