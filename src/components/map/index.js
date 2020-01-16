import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import HomeIcon from '../../assets/marker_icons/icon.png';
import RestroIcon from '../../assets/marker_icons/restro2.png';
import NewLocationIcon from '../../assets/marker_icons/new_place.png';

import * as apiKey from '../../utils/api_key.json';
import { Container } from '../styled_components/index.js';
import { CustomMarker } from './custom_marker';
import { formatResultArray } from '../../App';

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
function CustomMap({ setLocations, bounds, updateBounds, loaded, addLocation, homeMarker, google, newLocations, locations, updateCenter, center }) {
    let { latitude, longitude } = useCurrentLocation(loaded);
    const Base = (!!homeMarker ? homeMarker : Marker);
    const [service, updateService] = useState(null);
    const SUCCESS_VALUE = google.maps.places.PlacesServiceStatus.OK;
    useEffect(function () {
        if (service) {
            service.nearbySearch({
                location: center ? {
                    lat: center.latitude,
                    lng: center.longitude
                } : { lat: latitude, lng: longitude },
                radius: '500',
                type: 'restaurant'
            }, function (results, status) {
                if (status === SUCCESS_VALUE) {
                    setLocations(formatResultArray(results));
                }
            });
        }
    }, [latitude, longitude, service, center, SUCCESS_VALUE, setLocations]);



    return (
        <Map google={google}

            onTilesloaded={(mapProps, map) => {
                updateBounds(map.getBounds());
            }}
            onReady={(mapProps, map) => {
                const { google } = mapProps;
                const service = new google.maps.places.PlacesService(map);
                updateService(service);
            }}
            onDragend={(mapProps, map) => {
                updateCenter({ latitude: map.getCenter().lat(), longitude: map.getCenter().lng() })
                updateBounds(map.getBounds());
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
            {locations.map(function (element, index) {
                if (element.isNew) {
                    return <NewLocationMarker key={index} position={{ lat: element.latitude, lng: element.longitude }} />
                }
                else {
                    return <RestroMarker key={index} position={{ lat: element.latitude, lng: element.longitude }} />
                }
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
export function NewLocationMarker(props) {
    return <CustomMarker {...props} icon={{ url: NewLocationIcon, dim: [35, 35] }} />
}


export default GoogleApiWrapper({
    apiKey: apiKey.google_maps_api,
    LoadingContainer: props => (<Container><span>Hoper</span></Container>)
})(CustomMap)