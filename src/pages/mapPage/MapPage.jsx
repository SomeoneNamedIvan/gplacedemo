import React, {useEffect, useRef} from "react";
import {withGMapInit} from "../../hoc/withGMapInit";
import {withSelector} from "../../hoc/withSelector";

import {useDispatch, useSelector} from "react-redux";
import ACTION_TYPES from "../../states/actions/actionTypesConst";
import BoxControl from "./components/BoxControl";
import InfoWindow from "./components/InfoWindow";
import PlaceList from "./components/PlaceList";

export default withSelector(withGMapInit((props) => {
    const {mapLoaded, currentPlace} = props;
    const mapBody = useRef(null);

    const dispatch = useDispatch();
    const initDispatch = (gMap) => dispatch({type: ACTION_TYPES.INIT_MAP, payload: gMap});
    const onMapLoaded = React.useCallback(initDispatch, [dispatch]);

    useEffect(() => {
        if (mapLoaded) {
            initGoogleMap();
        }
    }, [mapLoaded]);

    useEffect(() => {
        console.log("currentPlace", currentPlace);

    }, [currentPlace]);

    const initGoogleMap = () => {
        const map = new google.maps.Map(mapBody?.current, {
            center: {lat: 3.1390, lng: 101.6869},
            zoom: 13,
        });

        onMapLoaded(map);
    };

    return (
        <div id={"gmap-page"}>
            <BoxControl/>
            <div ref={mapBody} className={"map-body"}/>
            <InfoWindow/>
            <PlaceList/>
        </div>
    );
}));