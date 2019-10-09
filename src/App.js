import React, { useState } from 'react';
import './App.css';

import CustomMap, { HomeMarker } from './components/map';
import SideBarButton from './components/side_bar/side_bar_button';
import { SideDrawer } from './components/side_bar/side_drawer';
import data from './api/ajax_request';

import { FlexCenter } from './components/styled_components';
import { AddPlace } from './components/add_place';
function useCustomHook() {
  const [locations, setLocations] = useState([...data.default.data]);
  const [menuFlag, updateMenuFlag] = useState(false);
  const [addLocationFlag, updateAddLocationFlag] = useState(false);
  const [tempLocation, updateTempLocation] = useState(null);
  const [center, updateCenter] = useState(false);

  return {
    locations,
    menuFlag,
    addLocationFlag,
    center,
    openMenu() {
      updateMenuFlag(true);
      updateAddLocationFlag(false);
    },
    closeMenu() {
      updateMenuFlag(false);
      updateCenter(false);
    },
    closeAddScreen() {
      updateAddLocationFlag(false);
      setLocations(locations => locations.map(loc => ({
        ...loc,
        isShow: false
      })));
      updateCenter(false);
      updateTempLocation({});
    },
    openAddScreen(tempObj) {
      if (locations.filter(function (loc) {
        return (loc.latitude === tempObj.latitude &&
          loc.longitude === tempObj.longitude)
      }).length > 0) {
        return false;
      }
      updateTempLocation(tempObj);
      updateAddLocationFlag(true);
      updateMenuFlag(false);
    },
    addThisLocation(name, address) {
      setLocations(loc => {
        const newLocation = {
          ...tempLocation,
          restaurantName: name, address,
          index: loc.length,
          ratings: [],
          isShow: false
        };
        let updatedLocations = [...loc, newLocation];
        updatedLocations = updatedLocations.map(_loc => ({
          ..._loc, isShow: true
        }));
        console.log("Y")
        setTimeout(() => {
          setLocations(l => l.map(_loc => ({ ..._loc, isShow: _loc.index === newLocation.index ? false : _loc.isShow })));
          console.log("N")

        }, 5000)
        return updatedLocations;
      });
      updateAddLocationFlag(false);
    },
    giveRating(message, stars, key) {
      setLocations(locations => locations.map(loc => (loc.index === key) ? {
        ...loc,
        ratings: [...loc.ratings, {
          "stars": stars,
          "comment": message
        }]
      } : loc))
    },
    markPlace(key) {
      setLocations(locations => [...locations.map(loc => {
        if (loc.index === key) {
          updateCenter({ latitude: loc.latitude, longitude: loc.longitude });
          return {
            ...loc,
            isShow: true,
          }
        } else {
          return loc;
        }
      })])
    },
    noMarker() {
      setLocations(locations => locations.map(loc => ({
        ...loc,
        isShow: false
      })));
    },
    updateCenter
  };
}


function App() {
  const { updateCenter, center, locations, menuFlag, addLocationFlag, openMenu, closeMenu, openAddScreen, closeAddScreen, addThisLocation, giveRating, markPlace, noMarker } = useCustomHook();
  console.log(locations)

  return (<>
    <SideBarButton openMenu={openMenu} />
    <FlexCenter style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1, overflow: 'hidden', width: '100%' }}>
      <SideDrawer updateCenter={updateCenter} locations={locations} markPlace={markPlace} show={menuFlag} closeMenu={closeMenu} addRating={giveRating} />
      <CustomMap
        center={center}
        updateCenter={updateCenter}
        homeMarker={HomeMarker}
        locations={locations}
        addLocation={openAddScreen} />
    </FlexCenter>
    <AddPlace show={addLocationFlag} onAddClick={addThisLocation} onCloseClick={closeAddScreen} />  </>);
}
export default App;
