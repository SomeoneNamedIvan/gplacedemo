import ACTION_TYPES from "../actions/actionTypesConst";

const defaultState = {
    mapData: null,
    autoComplete: null,
    showInfo: false,
    currentPlace: null
};

export default (state = defaultState, action) => {
    const newState = {};

    switch (action.type) {
        case ACTION_TYPES.INIT_MAP:
            console.log("come in here", action.payload);
            newState.mapData = action.payload;
            break;
        case ACTION_TYPES.CLEAR_INFO:
            newState.currentPlace = null;
            break;
        case ACTION_TYPES.PLACE_UPDATED:
            console.log("come in here updated")
            newState.currentPlace = action.payload;
            break;
    }

    return {
        ...state,
        ...newState
    };
}