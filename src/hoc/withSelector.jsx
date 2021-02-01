import React from "react";
import {useSelector} from "react-redux";

export const withSelector = Component => props => {
    const mapData = useSelector(d => d?.map?.mapData);
    const currentPlace = useSelector(d => d?.map?.currentPlace);

    const combinedProps = {...props, mapData, currentPlace};
    return (
        <Component {...combinedProps}/>
    );
};