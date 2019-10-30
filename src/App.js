import React, { useState, useEffect } from 'react';
import './App.css';

import CustomMap, { HomeMarker } from './components/map';
import SideBarButton from './components/side_bar/side_bar_button';
import { SideDrawer } from './components/side_bar/side_drawer';
import data from './api/ajax_request';

import { FlexCenter, AlertMessage } from './components/styled_components';
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


function App() {

  const { updateCenter, center, locations, menuFlag, addLocationFlag, openMenu, closeMenu, openAddScreen, closeAddScreen, addThisLocation, giveRating, markPlace, noMarker } = useCustomHook();
  const { alertMessage, alertState, showAlert, hideAlert, alertType } = useAlertState();
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
        locations={locations}
        markPlace={markPlace}
        show={menuFlag}
        closeMenu={closeMenu}
        addRating={giveRating}
      />
      <CustomMap
        center={center}
        updateCenter={updateCenter}
        homeMarker={HomeMarker}
        newLocations={locations.filter((loc) => !loc.isShow && loc.isNew)}
        locations={locations.filter((loc) => loc.isShow)}
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
