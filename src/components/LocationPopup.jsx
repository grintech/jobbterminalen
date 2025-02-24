import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the location is already stored
    const savedLocation = localStorage.getItem("userLocation");
    if (!savedLocation) {
      setShowPopup(true);
    }
  }, []);

  const handleAllow = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch IP details
            const ipData = await fetchIPDetails();

            // Combine location and IP data
            const locationData = {
              latitude,
              longitude,
              ip: ipData?.ip || "Unknown",
              city: ipData?.city || "Unknown",
              region: ipData?.region || "Unknown",
              country: ipData?.country || "Unknown",
            };

            // Store in localStorage
            localStorage.setItem("userLocation", JSON.stringify(locationData));
            setShowPopup(false); 
            // alert(`Location and IP saved successfully!`);
          },
          (error) => {
            console.error("Error fetching location: ", error);
            alert("Unable to fetch location. Please check your permissions.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    } catch (error) {
      console.error("Error saving location and IP:", error);
      alert("An error occurred while fetching location details.");
    }
  };

  const fetchIPDetails = async () => {
    try {
      const response = await axios.get("https://ipinfo.io/json?token=a050d6ac9c1dde");
      return response.data;
    } catch (error) {
      console.error("Error fetching IP details:", error);
      return null;
    }
  };

  const handleDeny = () => {
    // alert("Location access denied.");
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="location-popup">
          <div className="popup-content">
            <h5>JobbTerminalenen wants to</h5>
            <p className="m-0"><i className="fa-solid fa-location-dot me-2 text-muted"> </i>Know your location</p>
            <p>
              We need your location access to provide personalized job
              recommendations.
            </p>
            <div className="popup-buttons">
              <button onClick={handleAllow} className="btn-allow btn btn-sm btn-light mx-1">
                Allow
              </button>
              <button onClick={handleDeny} className="btn-deny btn btn-sm btn-light mx-1">
                Deny
              </button>
            </div>
          </div>
          <div className="popup-overlay" />
        </div>
      )}
    </>
  );
};

export default LocationPopup;
