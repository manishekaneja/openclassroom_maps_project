import { useEffect, useRef, useState } from 'react';



//Custom Marker
export function CustomMarker(props) {
    let [initallLoad, updateLoadingState] = useState(true);
    const marker = useRef();
    const position = props.position || props.mapCenter;
    const preferences = {
        map: props.map,
        position: new props.google.maps.LatLng(position.lat, position.lng),
        icon: !!props.icon ? ((!!props.icon.url) ? {
            url: props.icon.url,
            ...(props.icon ? { scaledSize: new props.google.maps.Size(props.icon.dim[0], props.icon.dim[1]) } : {})
        } : props.icon ): null,
        ...(initallLoad ? { animation: props.google.maps.Animation.DROP } : {})
    };
    useEffect(() => {
        if (initallLoad) {
            updateLoadingState(false);
        }
    }, [initallLoad]);
    useEffect(function () {
        marker.current = new props.google.maps.Marker(preferences);
        marker.current.addListener('click', function () {
            if (marker.current.getAnimation() !== null) {
                marker.current.setAnimation(null);
            } else {
                marker.current.setAnimation(props.google.maps.Animation.BOUNCE);
                setTimeout(_ => marker.current.setAnimation(null), 1500)
            }
        });
        return function () {
            marker.current.setMap(null);
        }
    }, [marker, preferences, props.google]);
    return null;
}
