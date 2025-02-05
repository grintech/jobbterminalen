import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import Cookies from 'js-cookie';

const GeoLocation = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    useEffect(() => {
        if (coords) {

            Cookies.set('latitude', coords.latitude, { sameSite: 'None', secure: true });
            Cookies.set('longitude', coords.longitude, { sameSite: 'None', secure: true }); 

            console.log("Latitude:", coords.latitude);
            console.log("Longitude:", coords.longitude);
            console.log("Altitude:", coords.altitude);
            console.log("Heading:", coords.heading);
            console.log("Speed:", coords.speed);
        }
    }, [coords]);

    if (!isGeolocationAvailable) {
        console.log("Your browser does not support Geolocation");
    } else if (!isGeolocationEnabled) {
        console.log("Geolocation is not enabled");
    } else if (!coords) {
        console.log("Getting the location data…");
    }

    return null;
};

export default GeoLocation;
