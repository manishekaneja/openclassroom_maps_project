import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import HomeIcon from '../../assets/marker_icons/icon.png';
import RestroIcon from '../../assets/marker_icons/restro.jpeg';

import * as apiKey from '../../utils/api_key.json';
import { Container } from '../styled_components/index.js';
import { CustomMarker } from './custom_marker';

function useCurrentLocation(loaded) {
    const [location, updateLocation] = useState({ latitude: 0, longitude: 0 });
    useEffect(function () {
        if (loaded) {
            navigator.geolocation.getCurrentPosition(function (position) {
                updateLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        }
    }, [loaded]);
    return location;
}
function CustomMap({ loaded, addLocation, homeMarker, google, locations, updateCenter, center }) {
    let { latitude, longitude } = useCurrentLocation(loaded);
    const [bounds, updateBounds] = useState(false);
    console.log(locations, locations.filter(e => (!!bounds && !(bounds.getNorthEast().lat() <= e.latitude ||
        bounds.getSouthWest().lat() >= e.latitude ||
        bounds.getNorthEast().lng() <= e.longitude ||
        bounds.getSouthWest().lng() >= e.longitude))))
    // useEffect(() => {
    //     console.log(google, loaded)
    //     if (loaded) {
    //         console.log({ g: google.map.Map.getBounds() })
    //     }
    // }, [locations, loaded])
    const Base = (!!homeMarker ? homeMarker : Marker);
    return (
        <Map google={google}
            onReady={(mapProps, map) => {
                console.log("up");
                // updateBounds(map.getBounds());
            }}
            onDragend={(mapProps, map) => {
                updateCenter({ latitude: map.getCenter().lat(), longitude: map.getCenter().lng() })
                updateBounds(map.getBounds());
                console.log(locations.filter(e => (!!bounds && !(bounds.getNorthEast().lat() <= e.latitude ||
                    bounds.getSouthWest().lat() >= e.latitude ||
                    bounds.getNorthEast().lng() <= e.longitude ||
                    bounds.getSouthWest().lng() >= e.longitude))))
            }}
            center={center ? {
                lat: center.latitude,
                lng: center.longitude
            } : {
                    lat: latitude,
                    lng: longitude
                }}
            onClick={(mapProps, map, event) => {
                addLocation({
                    latitude: event.latLng.lat(),
                    longitude: event.latLng.lng(),
                })
            }}>
            <Base position={{ lat: latitude, lng: longitude }} />
            {locations.filter(e => (!!bounds && !(bounds.getNorthEast().lat() <= e.latitude ||
                bounds.getSouthWest().lat() >= e.latitude ||
                bounds.getNorthEast().lng() <= e.longitude ||
                bounds.getSouthWest().lng() >= e.longitude))).map(function (element, index) {
                    return <RestroMarker key={index} position={{ lat: element.latitude, lng: element.longitude }} />
                })}
        </Map>
    );
}
export function HomeMarker(props) {
    return <CustomMarker {...props} icon={{ url: HomeIcon, dim: [35, 50] }} />
}
export function RestroMarker(props) {
    return <CustomMarker {...props} icon={{ url: RestroIcon, dim: [35, 35] }} />
}


export default GoogleApiWrapper({
    apiKey: apiKey.google_maps_api,
    LoadingContainer: props => (<Container><span>Hoper</span></Container>)
})(CustomMap)