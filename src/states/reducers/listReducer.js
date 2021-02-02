import ACTION_TYPES from "../actions/actionTypesConst";

const defaultState = {
    placeList: [],
    show: false
};

export default (state = defaultState, action) => {
    const newState = {};
    switch (action.type) {
        case ACTION_TYPES.GET_PLACES:
            newState.placeList = action.payload;
            break;
    }

    return {
        ...state,
        ...newState
    };
}