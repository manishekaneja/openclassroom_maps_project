import React, { useState, useEffect } from 'react';
import './App.css';

import CustomMap, { HomeMarker } from './components/map';
import SideBarButton from './components/side_bar/side_bar_button';
import { SideDrawer } from './components/side_bar/side_drawer';

import { FlexCenter, AlertMessage } from './components/styled_components';
import { AddPlace } from './components/add_place';

/*
Utility Function to restructure Array
*/
export function formatResultArray(result_array) {
  return result_array.map((element, index) => {
    return {
      index: index,
      name: element.name,
      address: element.vicinity,
      ratings: [{
        index: 1,
        comment: "People rated this place as",
        stars: element.rating ? element.rating > 5 ? 5 : Math.round(element.rating) : 0
      }],
      latitude: element.geometry.location.lat(),
      longitude: element.geometry.location.lng(),
      isShow: false,
      isNew: false,
    }
  });
}


/*
Custom Hook to track locations
*/

function useCustomHook() {
  const [locations, setLocations] = useState([...formatResultArray([])]);
  const [menuFlag, updateMenuFlag] = useState(false);
  const [addLocationFlag, updateAddLocationFlag] = useState(false);
  const [tempLocation, updateTempLocation] = useState(null);
  const [center, updateCenter] = useState(false);

  return {
    locations,
    menuFlag,
    addLocationFlag,
    center,
    setLocations,
    openMenu() {
      updateMenuFlag(true);
      updateAddLocationFlag(false);
    },
    closeMenu() {
      updateMenuFlag(false);
      updateCenter(false);
      setLocations(locations => locations.map(loc => ({
        ...loc,
        isShow: false
      })));
    },
    closeAddScreen() {
      updateAddLocationFlag(false);
      updateCenter(false);
      updateTempLocation({});
    },
    openAddScreen(tempObj) {
      if (locations.filter((loc) => {
        return (loc.latitude === tempObj.latitude &&
          loc.longitude === tempObj.longitude)
      }).length > 0) {
        return false;
      }
      updateCenter(false);
      setLocations(locations => locations.map(loc => ({
        ...loc,
        isShow: false
      })));
      updateTempLocation(tempObj);
      updateAddLocationFlag(true);
      updateMenuFlag(false);
    },
    addThisLocation(name, address) {
      setLocations(loc => {
        const newLocation = {
          ...tempLocation,
          name: name, address,
          index: loc.length,
          ratings: [],
          isShow: false,
          isNew: true
        };
        let updatedLocations = [...loc, newLocation];
        setTimeout(() => {
          setLocations(l => l.map(_loc => ({ ..._loc, isNew: _loc.index === newLocation.index ? false : _loc.isNew })));
        }, 5000)
        return updatedLocations;
      });
      updateAddLocationFlag(false);
    },
    giveRating(message, stars, key) {
      setLocations(locations => locations.map(loc => (loc.index === key) ? {
        ...loc,
        ratings: [...loc.ratings, {
          "index":loc.ratings.length,
          "stars": stars,
          "comment": message
        }]
      } : loc))
    },
    markPlace(key) {
      setLocations(locations => locations.map(loc => {
        if (loc.index === key) {
          updateCenter({ latitude: loc.latitude, longitude: loc.longitude });
          return {
            ...loc,
            isShow: true,
          }
        } else {
          return loc;
        }
      }))
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

/*
Custom Hook for Showing Alert
*/

function useAlertState() {
  const [alertState, updateAlertValue] = useState(false);
  const [alertMessage, updateAlertMessage] = useState("");
  const [alertType, updateAlertType] = useState("");
  return {
    alertState,
    alertMessage,
    alertType,
    showAlert(message = "Something has occured", type = "") {
      updateAlertValue(state => {
        if (state) {
          setTimeout(_ => {
            updateAlertValue(true);
            updateAlertMessage(message);
            updateAlertType(type);
          }, 1000)
          return false;
        }
        else {
          updateAlertMessage(message);
          updateAlertType(type);
          setTimeout(_ => {
            updateAlertValue(false);
          }, 2000);
          return true;
        }
      })

    },
    hideAlert() {
      updateAlertValue(false);
    }

  }

}


/*

Main Component to Start the App



*/



function App() {

  const { updateCenter, setLocations,center, locations, menuFlag, addLocationFlag, openMenu, closeMenu, openAddScreen, closeAddScreen, addThisLocation, giveRating, markPlace, noMarker } = useCustomHook();
  const { alertMessage, alertState, showAlert, hideAlert, alertType } = useAlertState();
  const [bounds, updateBounds] = useState(false);
  useEffect(() => {
    showAlert("Ready To Start", "success");
  }, [])

  return (<>
    <SideBarButton openMenu={openMenu} />
    <FlexCenter style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1, overflow: 'hidden', width: '100%' }}>
      <SideDrawer
        showAlert={showAlert}
        hideAlert={hideAlert}
        noMarker={noMarker}
        updateCenter={updateCenter}
        locations={[...locations].filter(e => (!!bounds && !(bounds.getNorthEast().lat() <= e.latitude ||
          bounds.getSouthWest().lat() >= e.latitude ||
          bounds.getNorthEast().lng() <= e.longitude ||
          bounds.getSouthWest().lng() >= e.longitude)))}
        markPlace={markPlace}
        show={menuFlag}
        closeMenu={closeMenu}
        addRating={giveRating}
      />
      <CustomMap
        center={center}
        setLocations={setLocations}
        updateCenter={updateCenter}
        homeMarker={HomeMarker}
        newLocations={locations.filter((loc) => !loc.isShow && loc.isNew)}
        locations={locations.filter((loc) => loc.isShow)}
        bounds={bounds}
        updateBounds={updateBounds}
        addLocation={openAddScreen} />
    </FlexCenter>
    <AlertMessage open={alertState} type={alertType} >
      <span onClick={hideAlert}>
        {alertMessage}
      </span>
    </AlertMessage>
    <AddPlace show={addLocationFlag} onAddClick={(name, address) => {
      addThisLocation(name, address);
      showAlert("Found New Place \"" + name + "\"", "success");
    }} onCloseClick={closeAddScreen} />  </>);
}
export default App;
