import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {Box} from "@material-ui/core";

const InfoWindow = () => {
    const map = useSelector(d => d.map);

    useMemo(() => {

    }, [map]);

    return (
        <Box>

        </Box>
    );
};

export default InfoWindow;

