import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrawerHeader } from './drawer_header';
import { Container } from '../../styled_components';
import { DrawerFooter } from './drawer_footer';
import PlaceCard from '../place_card';
const Drawer = styled(Container)`
    height: 100vh;
    background-color: #ccc;
    z-index: 3;
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
    let [locationsArray, updateLocations] = useState(locations)
    let [phrase, updatePhrase] = useState('');
    useEffect(function () {
        updateLocations(locations => locations.filter(function (loc) {
            if (phrase.toString().trim().length === 0) {
                return false;
            }
            return loc.restaurantName.toLowerCase().includes(phrase.toString().trim().toLowerCase()) ||
                loc.address.toLowerCase().includes(phrase.toString().trim().toLowerCase());
            ;
        }))
    }, [locations, phrase]);
    return { locationsArray, phrase, updatePhrase };
}

export function SideDrawer({ show, closeMenu, locations, addRating, markPlace, updateCenter }) {
    const { locationsArray, phrase, updatePhrase } = useHookForSearch(locations);
    const [showRating, toggleRating] = useState(0);
    return <Drawer style={{ width: (!show) ? '0px' : '400px' }} className="hide" >
        <DrawerHeader closeMenu={closeMenu} phrase={phrase} updatePhrase={updatePhrase} />
        <div style={{ padding: '20px 10px', flex: 1, overflowY: 'scroll' }}>
            {locationsArray.map((element, index) => <PlaceCard addRating={addRating} key={index} showRating={showRating === index} toggleRating={() => {
                toggleRating(selected => index === selected ? -1 : index);
                markPlace(element.index);
                console.log(element)
            }} element={element} />)}
        </div>
        <DrawerFooter updateCenter={updateCenter} />
    </Drawer>
}