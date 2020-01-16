import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrawerHeader } from './drawer_header';
import { Container } from '../../styled_components';
import SideBarButton from '../side_bar_button';
import { DrawerFooter } from './drawer_footer';
import PlaceCard from '../place_card';
const Drawer = styled(Container)`
    height: 100vh;
    background-color: #ccc;
    z-index: 101;
    left:0;
    transition: 0.5s;
    width:${({ show }) => show ? '400px' : '0px'}
    display:flex;
    box-shadow: 0.16px 0.33px 8px whitesmoke;
    flex-direction: column;
    line-height:1.5;
    transistion:1s;
    overflow:hidden;
`;

function useHookForSearch(locations) {
    let [locationsArray, updateLocations] = useState(locations);
    let [phrase, updatePhrase] = useState('');
    const [selectedRating, updateSelectedRating] = useState(-1);

    useEffect(function () {
        updateLocations(locations.filter(function (loc) {
            if (phrase.toString().trim().length === 0) {
                return true;
            }
            return (loc.name.toLowerCase().includes(phrase.toString().trim().toLowerCase()) ||
                loc.address.toLowerCase().includes(phrase.toString().trim().toLowerCase()));
        }).filter(function (loc) {
            return (selectedRating === -1 ? true : (selectedRating === loc.averageRating));
        }));
    }, [locations, phrase, selectedRating]);
    return { locationsArray, phrase, updatePhrase, selectedRating, updateSelectedRating };
}

export function SideDrawer({ locations, showAlert, addRating, addLocationFlag, updateCenter }) {
    const { locationsArray, phrase, updatePhrase, selectedRating, updateSelectedRating } = useHookForSearch(locations);
    const [showRating, toggleRating] = useState(-1);

    const [openMenuFlag, updatedMenuFlag] = useState(false);
    useEffect(() => {
        if (addLocationFlag) {
            updatedMenuFlag(false);
            toggleRating(-1);
        }
    }, [addLocationFlag])


    return <>
        <SideBarButton openMenu={_ => updatedMenuFlag(true)} />
        <Drawer show={openMenuFlag}>
            <DrawerHeader closeMenu={_ => { toggleRating(-1); updatedMenuFlag(false) }} phrase={phrase} updatePhrase={updatePhrase} selectedRating={selectedRating} updateSelectedRating={updateSelectedRating} />
            <div style={{ padding: '20px 10px', flex: 1, overflowY: 'scroll' }}>
                {locationsArray.map((element, index) => {
                    return <PlaceCard addRating={addRating} key={index} showAlert={showAlert} showRating={showRating === index} toggleRating={() => {
                        // console.log(element)
                        updateCenter({ latitide: element.latitide, longitude: element.longitude })
                        toggleRating(selected => index === selected ? -1 : index);
                    }} element={element} />
                })}
            </div>
            <DrawerFooter updateCenter={() => {
                updateCenter(false);
                showAlert("Back to Center", "success");
            }} />
        </Drawer>
    </>
}