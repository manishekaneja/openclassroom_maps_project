import React, { useState } from 'react';
import './App.css';

import CustomMap, { HomeMarker } from './components/map';
import { SideDrawer } from './components/side_bar/side_drawer';

import { FlexCenter, AlertMessage } from './components/styled_components';
import { AddPlace } from './components/add_place';

// import * as data from './data/res.json'
/*
Utility Function to restructure Array
*/

// const imageArray = [
//   'https://images.unsplash.com/photo-1533467915241-eac02e856653?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
//   'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
// ]


export function formatResultArray(result_array) {

  return result_array.map((element, index) => {
    if ('photos' in element) {
      element.photos.forEach(e => { console.log(e.getUrl()) });
      fetch('')
    }
    return {
      index: index,
      name: element.name,
      address: element.vicinity,
      ratings: [{
        index: 1,
        comment: "People rated this place as",
        stars: element.rating ? element.rating > 5 ? 5 : Math.round(element.rating) : 0
      }],
      averageRating: element.rating ? element.rating > 5 ? 5 : Math.round(element.rating) : 0,
      latitude: element.geometry.location.lat(),
      longitude: element.geometry.location.lng(),
      isShow: false,
      isNew: false,
      // photo: imageArray
      photo: 'photos' in element && element.photos.length > 0 ? element.photos.map(e => e.getUrl()) : null
    }
  });
}


/*
Custom Hook to track locations
*/




function useCustomHookToManageLocations() {
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
      // updateCenter(false);
      updateTempLocation({});
    },
    openAddScreen(tempObj) {
      if (locations.filter((loc) => {
        return (loc.latitude === tempObj.latitude &&
          loc.longitude === tempObj.longitude)
      }).length > 0) {
        return false;
      }
      // updateCenter(false);
      // setLocations(locations => locations.map(loc => ({
      //   ...loc,
      //   isShow: false
      // })));
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
      setLocations(locations => locations.map(loc => {

        console.log(
          loc.ratings.length > 1 ?
            loc.ratings.reduce((ele, avg) => ({
              ...ele, stars: parseInt(ele.stars) + (parseInt(avg.stars) / loc.ratings.length)
            })).stars : (loc.ratings.length === 1 ? loc.ratings[0].stars : 0))
        return (loc.index === key) ? {
          ...loc,
          averageRating: loc.ratings.length > 0 ?
            Math.floor([...loc.ratings, {
              "index": loc.ratings.length,
              "stars": stars,
              "comment": message
            }].reduce((ele, avg) => ({
              ...ele, stars: parseInt(ele.stars) + (parseInt(avg.stars))
            })).stars / (loc.ratings.length + 1)) : stars,
          ratings: [...loc.ratings, {
            "index": loc.ratings.length,
            "stars": stars,
            "comment": message
          }]
        } : loc;
      }))
    },
    markPlace(key) {
      setLocations(locations => locations.map(loc => {
        if (loc.index === key) {
          // updateCenter({ latitude: loc.latitude, longitude: loc.longitude });
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



function getFilteredLocation(locationsArray, bounds) {
  return [...locationsArray].filter(e => (!!bounds && !(bounds.getNorthEast().lat() <= e.latitude ||
    bounds.getSouthWest().lat() >= e.latitude ||
    bounds.getNorthEast().lng() <= e.longitude ||
    bounds.getSouthWest().lng() >= e.longitude)))
}
/*

Main Component to Start the App



*/




function App() {

  const { updateCenter, setLocations, center, locations, addLocationFlag, openAddScreen, closeAddScreen, addThisLocation, giveRating } = useCustomHookToManageLocations();
  const { alertMessage, alertState, showAlert, hideAlert, alertType } = useAlertState();
  const [bounds, updateBounds] = useState(false);
  return (<>
    <FlexCenter style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1, overflow: 'hidden', width: '100%' }}>
      <SideDrawer
        showAlert={showAlert}
        addLocationFlag={addLocationFlag}
        updateCenter={updateCenter}
        locations={[...locations].filter(e => (!!bounds && !(bounds.getNorthEast().lat() <= e.latitude ||
          bounds.getSouthWest().lat() >= e.latitude ||
          bounds.getNorthEast().lng() <= e.longitude ||
          bounds.getSouthWest().lng() >= e.longitude)))}
        addRating={giveRating}
      />
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden', alignSelf: 'stretch' }}>
        <CustomMap
          center={center}
          setLocations={setLocations}
          updateCenter={updateCenter}
          homeMarker={HomeMarker}
          newLocations={getFilteredLocation(locations, bounds)}
          locations={getFilteredLocation(locations, bounds)}
          bounds={bounds}
          updateBounds={updateBounds}
          addLocation={openAddScreen} />
      </div>
    </FlexCenter>
    <AlertMessage open={alertState} type={alertType} >
      <span onClick={hideAlert}>
        {alertMessage}
      </span>
    </AlertMessage>
    <AddPlace show={addLocationFlag} onAddClick={(name, address) => {
      addThisLocation(name, address);
      showAlert("Found New Place \"" + name + "\"", "success");
    }} onCloseClick={closeAddScreen} />
    {/* <CommonImageSlider show={showSlider} imagesArray={selectedOutlet && 'photo' in selectedOutlet ? selectedOutlet.photo : []} /> */}
  </>);
}
export default App;
