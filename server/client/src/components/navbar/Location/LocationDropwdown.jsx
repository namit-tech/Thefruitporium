import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";

const LocationDropdown = ({ onLocationChange }) => {
  const [pinCode, setPinCode] = useState("");
  const [message, setMessage] = useState("");

  const toastOptions = {
    hideProgressBar: false,
    closeOnClick: true,
    autoClose: 3000, 
    draggable: true,
    theme: "light", 
    toastId: "location-dropdown", // Add unique toast ID to avoid duplication
  };
  

  const locationStyle = {
    borderRadius: "5px",
    backgroundColor : "white",
    fontSize: "10px",
    marginTop: "17px",
    height: "4vh",
    fontWeight: "500",
  }

  const detectLocation = () => {
    // toast.info("Detecting location...", toastOptions);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await checkDeliveryArea(latitude, longitude);
      },
      (error) => {
        console.error("Error detecting location:", error);
        toast.error(
          "Unable to detect location. Please enter a PIN code.",
          toastOptions
        );
      }
    );
  };

  const checkDeliveryArea = async (lat, lon) => {
    try {
      const response = await fetch(`${apiUrl}/api/check-delivery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userLat: lat, userLon: lon }),
      });

      if (!response.ok) throw new Error("Server error: " + response.status);

      const data = await response.json();
      if (data.isDeliverable) {
        toast.success(
          `Delivery available! Distance: ${data.distance.toFixed(2)} km`,
          { ...toastOptions }
        );
        setMessage(`Deliverable within ${data.distance.toFixed(2)} km`);
        onLocationChange(`Deliverable within ${data.distance.toFixed(2)} km`);
      } else {
        toast.error(
          `Delivery not available. Distance: ${data.distance.toFixed(2)} km`,
          { ...toastOptions }
        );
        setMessage("Delivery unavailable for this location.");
        onLocationChange("Delivery unavailable for this location.");
      }
    } catch (error) {
      console.error("Error checking delivery area:", error);
      toast.error("An error occurred while checking delivery.", toastOptions);
      setMessage("An error occurred while checking delivery.");
      onLocationChange("Error checking location.");
    }
  };

  const handlePinCodeSubmit = async () => {
    // toast.info("Validating PIN code...", { ...toastOptions, style: { backgroundColor: "#007bff", color: "#fff" } });

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${pinCode}&key=AIzaSyAg7_XmFePaAAvZm2Jh1laXAQ5QrYJb-T8`
      );
      const data = await response.json();

      if (data.results.length) {
        const { lat, lng } = data.results[0].geometry.location;
        await checkDeliveryArea(lat, lng);
      } else {
        toast.error("Invalid PIN code. Please try again.", toastOptions);
        setMessage("Invalid PIN code.");
        onLocationChange("Invalid PIN code.");
      }
    } catch (error) {
      console.error("Error validating PIN code:", error);
      toast.error(
        "An error occurred while validating the PIN code.",
        toastOptions
      );
    }
  };

  return (
    <>
      <div>
        <button style={locationStyle} onClick={detectLocation}>Detect Location</button>
        {/* <input
          type="text"
          placeholder="Enter PIN code"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
        /> */}
        {/* <button onClick={handlePinCodeSubmit}>Submit PIN Code</button> */}
      </div>
    </>
  );
};

export default LocationDropdown;
