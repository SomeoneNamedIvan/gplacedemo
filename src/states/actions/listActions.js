import ACTION_TYPES from "./actionTypesConst";

const getAllPlace = (newArr) => ({type: ACTION_TYPES.GET_PLACES, payload: newArr});

const goToPlace = (place) => ({type: ACTION_TYPES.PLACE_UPDATED, payload: place});

export {getAllPlace, goToPlace};