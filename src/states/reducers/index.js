import {combineReducers} from "redux";

import listReducer from "./listReducer";
import mapReducer from "./placeReducer";

const reducers = {
    list: listReducer,
    map: mapReducer
};

export default combineReducers(reducers);