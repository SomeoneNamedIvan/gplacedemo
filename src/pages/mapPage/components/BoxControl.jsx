import {withSelector} from "../../../hoc/withSelector";
import React, {useEffect, useRef, useState} from "react";
import {Card, IconButton, InputAdornment, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import ACTION_TYPES from "../../../states/actions/actionTypesConst";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default withSelector(({mapData}) => {
    const [autoComplete, setAutoComplete] = useState(null);
    const [text, setText] = useState("");
    const searchInput = useRef(null);
    const control = useRef(null);
    const [clearText, setClearText] = useState(false);
    const clearRef = useRef(clearText);
    clearRef.current = clearText;

    const dispatch = useDispatch();

    const handlePlaceChange = () => {
        console.log({current:clearRef.current, clearText})
        if (!clearRef.current) {
            dispatch({type: ACTION_TYPES.PLACE_CHANGED, payload: autoComplete});
        }
    };

    const initAutoComplete = () => {
        const options = {
            fields: ["formatted_address", "geometry", "name", "place_id"],
            origin: mapData.getCenter(),
            strictBounds: false,
            types: ["establishment"],
        };

        // mapData.controls[google.maps.ControlPosition.TOP_RIGHT].push(control?.current);
        const _autoComplete = new google.maps.places.Autocomplete(searchInput?.current, options);
        setAutoComplete(_autoComplete);
    };

    useEffect(() => {
        if (mapData) {
            initAutoComplete();
        }
    }, [mapData]);

    useEffect(() => {
        if (autoComplete) {
            autoComplete.bindTo("bounds", mapData);
            autoComplete.addListener("place_changed", handlePlaceChange);
        }
    }, [autoComplete]);

    useEffect(() => {
        if (clearText) {
            resetClearTextCounter();
        }
    }, [clearText]);

    // previously using setTimeout 0
    // feels like using useEffect hook to handle to be more appropriate
    const resetClearTextCounter = () => {
        autoComplete.set("place", null);
        setText("");
        setClearText(false);
    };

    const handleClearSearch = () => {
        setClearText(true);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };
    const renderAdornment = () => (
        <InputAdornment position="end">
            <IconButton
                onClick={handleClearSearch}>
                <HighlightOffIcon/>
            </IconButton>
        </InputAdornment>
    );

    return (
        <Card innerRef={control} className={"autocomplete-wrap"}>
            <TextField inputRef={searchInput} label={"Enter a location.."} className={"input-wrap"}
                       value={text} onBlur={handleChange} onChange={handleChange}
                       InputProps={{endAdornment: renderAdornment()}}/>
        </Card>

    );

});