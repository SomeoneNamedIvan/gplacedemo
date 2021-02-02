import React, {useEffect, useRef, useState} from "react";
import {withSelector} from "../../../hoc/withSelector";

export default withSelector(({mapData, currentPlace: place}) => {
    const boxRef = useRef();
    const [marker, setMarker] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [geocoder, setGeocoder] = useState(null);

    useEffect(() => {
        if (mapData) {
            initMarker();
            initInfoWindow();
            initGeocoder();
        }
    }, [mapData]);

    useEffect(() => {
        onPlaceChange();
    }, [place]);

    useEffect(() => {
        if (marker && infoWindow) {
            marker.addListener("click", handleMarkerClick);
            marker.addListener("dragend", handleMarkerDragEnd);
        }
    }, [marker, infoWindow]);

    const onPlaceChange = () => {
        if (!(marker && infoWindow)) {
            return;
        }
        if (!place) {
            infoWindow.close();
            marker.visible = false;
        } else {
            marker.setPosition(place.geometry?.location);
            marker.visible = true;
            infoWindow.open(mapData, marker);
        }
    };

    const handleMarkerClick = () => {
        infoWindow.open(mapData, marker);
    };

    const handleMarkerDragEnd = (event) => {
        geocoder.geocode({location: event.latLng}, (result, status) => {
            console.log({result, status});
        });

    };

    const initMarker = () => {
        const _marker = new google.maps.Marker({
            map: mapData,
            draggable: true,
            anchorPoint: new google.maps.Point(0, -29),
            animation: google.maps.Animation.DROP
        });

        setMarker(_marker);
    };

    const initInfoWindow = () => {
        const _infoWindow = new google.maps.InfoWindow();
        _infoWindow.setContent(boxRef?.current);
        setInfoWindow(_infoWindow);
    };

    const initGeocoder = () => {
        const _geocoder = new google.maps.Geocoder();
        setGeocoder(_geocoder);
    };


    return (
        <div ref={boxRef}>
            <span>{place?.name}</span><br/>
            <span>{place?.formatted_address}</span>
        </div>
    );
});



