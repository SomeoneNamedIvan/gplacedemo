import React from "react";
import MapPage from "./pages/mapPage/MapPage";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import "./styles/app.scss";

import store from "./states/store";

const App = () => {
    return (
        <Provider store={store}>
            <MapPage/>
            <ToastContainer autoClose={5000} pauseOnFocusLoss={false} closeOnClick={false} draggable={false}/>
        </Provider>
    );
};

export default App;

