import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const GeoLocation = () => {
    const [location, setLocation] = useState(() => {
        const latitude = localStorage.getItem("latitude");
        const longitude = localStorage.getItem("longitude");
        return latitude && longitude
            ? { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
            : null;
    });

    useEffect(() => {
        if (!location) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        localStorage.setItem("latitude", latitude.toString());
                        localStorage.setItem("longitude", longitude.toString());
                        Cookies.set("latitude", latitude.toString(), { sameSite: "None", secure: true });
                        Cookies.set("longitude", longitude.toString(), { sameSite: "None", secure: true });
                        setLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.error("Geolocation error:", error.message);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        } else {
            // Ensure Cookies are always updated with the latest stored location
            Cookies.set("latitude", location.latitude.toString(), { sameSite: "None", secure: true });
            Cookies.set("longitude", location.longitude.toString(), { sameSite: "None", secure: true });
        }
    }, [location]);

    return null;
};

export default GeoLocation;
