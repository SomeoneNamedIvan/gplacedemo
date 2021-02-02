import ACTION_TYPES from "./actionTypesConst";

const clearInfo = () => {
    return {type: ACTION_TYPES.CLEAR_INFO};
};

const updatePlace = (place) => {
    return {type: ACTION_TYPES.PLACE_UPDATED, payload: place};
};

const addPlaceToList = (place) => {
    return {type: ACTION_TYPES.ADD_PLACE, payload: place};

}

export {clearInfo, updatePlace,addPlaceToList};