import {ofType} from "redux-observable";
import {map, switchMap} from "rxjs/operators";
import ACTION_TYPES from "../actions/actionTypesConst";
import {getAllPlace, goToPlace} from "../actions/listActions";
import {from} from "rxjs";

const addPlace = (newPlace, stateObjs) => {
    const currentArray = stateObjs?.value?.list?.placeList || [];
    const hasRecord = currentArray.find(item => item?.place_id === newPlace?.place_id);
    return !hasRecord ? [newPlace, ...currentArray] : currentArray;
};

const removePlace = (place_id, stateObjs, isRemoveAll = false) => {
    const currentArray = stateObjs?.value?.list.placeList || [];
    return isRemoveAll ? [] : currentArray.filter(item => !(item?.place_id === place_id));
};

const navigatePlace = (place_id, stateObjs) => {
    const currentArray = stateObjs?.value?.list.placeList || [];
    const found = currentArray.find(item => item?.place_id === place_id);
    return goToPlace(found);
};

const processEpic = async (action, stateObjs) => {
    if (action.type === ACTION_TYPES.ADD_PLACE) {
        return addPlace(action.payload, stateObjs);
    }
    let isRemoveAll = action.type === ACTION_TYPES.REMOVE_PLACE_ALL;
    return removePlace(action.payload, stateObjs, isRemoveAll);
};

const listItemEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_TYPES.ADD_PLACE, ACTION_TYPES.REMOVE_PLACE, ACTION_TYPES.REMOVE_PLACE_ALL),
    switchMap(action => from(processEpic(action, state$)).pipe(
        map(arr => getAllPlace(arr))
    ))
);

const navigateEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_TYPES.NAVIGATE_PLACE),
    map(action => navigatePlace(action.payload, state$))
);

export {listItemEpic, navigateEpic};
