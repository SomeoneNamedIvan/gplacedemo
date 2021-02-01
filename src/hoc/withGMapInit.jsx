import React, {useEffect, useState} from "react";

export const withGMapInit = Component => props => {
    const [mapLoaded, setMapLoaded] = useState(false);
    useEffect(() => {
        initGMapScript();
    }, []);

    const initGMapScript = () => {
        const script = document.createElement("script");
        // mine
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCwJefSry7-Dh4t2ik7tZyxYn-8P79LEXE&libraries=places&v=weekly";
        // someone's
        // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE&libraries=places&v=weekly";
        script.id = 'gmap-script';

        document.body.appendChild(script);

        script.onload = () => {
            setMapLoaded(true);
        };
    };
    const combinedProps = {...props, mapLoaded};
    return (
        <Component {...combinedProps}/>
    );
};