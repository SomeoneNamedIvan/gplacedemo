import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {Box} from "@material-ui/core";

const PlaceList = () => {
    const list = useSelector(d => d.list);

    useMemo(() => {

    }, [list]);

    return (
        <Box itemID={"place-list"}>

        </Box>
    );
};

export default PlaceList;

