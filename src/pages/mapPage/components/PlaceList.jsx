import React, {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Card,
    CardContent,
    Fab, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/Delete';
import ACTION_TYPES from "../../../states/actions/actionTypesConst";


const PlaceList = () => {
    const list = useSelector(d => d?.list?.placeList);
    const [showList, setShowList] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteClick = (place_id) => () => {
        dispatch({type: ACTION_TYPES.REMOVE_PLACE, payload: place_id});
    };

    const handleClearAll = () => {
        dispatch({type: ACTION_TYPES.REMOVE_PLACE_ALL});
    };

    const navigateTo = (place_id) => () => {
        dispatch({type: ACTION_TYPES.NAVIGATE_PLACE, payload: place_id});
    };

    const generateNode = ({place_id, name}) => (
        <ListItem key={place_id} button onClick={navigateTo(place_id)}>
            <ListItemIcon>
                <LocationOnIcon/>
            </ListItemIcon>
            <ListItemText primary={name}/>
            <ListItemSecondaryAction onClick={handleDeleteClick(place_id)}>
                <IconButton edge={"end"} color={"secondary"}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );

    const createList = () => {
        return useMemo(() => {
            return list.length > 0 ? list.map(generateNode) : (
                <ListItem>
                    <ListItemText primary={"Lets go search some place!"}/>
                </ListItem>);
        }, [list]);
    };

    return (
        <div className={"place-container"}>
            <Tooltip title={"Show List"} onClick={() => setShowList(prev => !prev)}>
                <Fab color={"primary"}>
                    <ListIcon/>
                </Fab>
            </Tooltip>
            <Tooltip title={"Clear List"} className={`clear-all${showList && " show" || ""}`}
                     onClick={handleClearAll}>
                <Fab color={"secondary"}>
                    <DeleteIcon/>
                </Fab>
            </Tooltip>
            <Card className={`place-list${showList && " expanded" || ""}`}>
                <CardContent>
                    <List component={"ul"}>
                        {createList()}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
};

export default PlaceList;

