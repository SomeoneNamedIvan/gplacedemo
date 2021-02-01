import React, {useEffect, useMemo, useRef, useState} from "react";
import {Box, Card, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import ACTION_TYPES from "../../../states/actions/actionTypesConst";


const BoxControl = () => {
    const map = useSelector(d => d?.map?.mapData);
    const [autoComplete, setAutoComplete] = useState(null);
    const searchInput = useRef(null);
    const control = useRef(null);

    const dispatch = useDispatch();

    const handlePlaceChange = () => {
        dispatch({type: ACTION_TYPES.PLACE_CHANGED, payload: autoComplete});
    };

    const initAutoComplete = () => {
        const options = {
            fields: ["formatted_address", "geometry", "name"],
            origin: map.getCenter(),
            strictBounds: false,
            types: ["establishment"],
        };

        // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control?.current);
        setAutoComplete(new google.maps.places.Autocomplete(searchInput?.current, options));
    };

    useMemo(() => {
        if (map) {
            initAutoComplete();
        }
    }, [map]);

    useMemo(() => {
        if (autoComplete) {
            autoComplete.bindTo("bounds", map);
            autoComplete.addListener("place_changed", handlePlaceChange);
        }
    }, [autoComplete]);

    return (
        <Card innerRef={control}>
            <TextField inputRef={searchInput} label={"Enter a location.."}/>
        </Card>

    );

};

export default BoxControl;