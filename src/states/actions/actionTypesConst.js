const listActions = {
    ADD_PLACE: "ADD_PLACE",
    GET_PLACES: "GET_PLACE",
    REMOVE_PLACE: "REMOVE_PLACE",
    REMOVE_PLACE_ALL: "REMOVE_PLACE_ALL",
    NAVIGATE_PLACE: "NAVIGATE_PLACE"
};

const placeActions = {
    INIT_MAP: "INIT_MAP",
    INIT_MAP_DONE: "INIT_MAP_DONE",
    CLEAR_INFO: "CLEAR_INFO",
    PLACE_CHANGED: "PLACE_CHANGED",
    PLACE_UPDATED: "PLACE_UPDATED"
};

const ACTION_TYPES = {
    ...listActions,
    ...placeActions
};

export default ACTION_TYPES;