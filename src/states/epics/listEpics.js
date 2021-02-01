import {ofType} from "redux-observable";
import {catchError, map, mergeMap} from "rxjs/operators";
import ACTION_TYPES from "../actions/actionTypesConst";
import {Observable, of} from "rxjs";

export const listItemEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_TYPES.ADD_PLACE),

);
