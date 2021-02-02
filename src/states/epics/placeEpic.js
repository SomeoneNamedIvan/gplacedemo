import {ofType} from "redux-observable";
import {from, of} from "rxjs";
import {catchError, map, mergeMap, switchMap} from "rxjs/operators";

import ACTION_TYPES from "../actions/actionTypesConst";
import {addPlaceToList, clearInfo, updatePlace} from "../actions/placeAction";
import store from "../store";
import {errorHandler} from "./utils/epicHandlers";

const getPlace = async (autoComplete, stateObs) => {
    try {
        if (stateObs?.value?.map?.currentPlace) {
            // cant find a solution to dispatch with epic before running getPlace()
            store.dispatch(clearInfo());
        }
        const place = autoComplete.getPlace();
        if (!place?.geometry) {
            throw new Error("No place found.");
        }

        return place;
    } catch (e) {
        throw e;
    }
};

const searchingEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_TYPES.PLACE_CHANGED),
    switchMap(action => from(getPlace(action.payload, state$)).pipe(
        mergeMap(place => of(updatePlace(place), addPlaceToList(place)))
    )),
    catchError((e, caught) => errorHandler(e, caught))
);

export {searchingEpic};