import {listItemEpic} from "./listEpics";
import {searchingEpic} from "./placeEpic";
import {combineEpics} from "redux-observable";
import {catchError} from "rxjs/operators";

const epics = [listItemEpic, searchingEpic];

const rootEpic = (action$, store$, dependencies) =>
    combineEpics(...epics)(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.warn("uncatched error", error);
            return source;
        })
    );

export default rootEpic;