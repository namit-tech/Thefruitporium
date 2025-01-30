import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./address.css";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = "http://localhost:5000";

const Address = () => {
  const [address, setAddress] = useState({
    uHouseNumber: "",
    uArea: "",
    uZipCode: "",
    uCity: "",
  });
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      const userPhone = localStorage.getItem("userPhone");
      console.log("localstorage", userPhone);

      if (!userPhone) {
        alert("Please login to view addresses");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/address`, {
          withCredentials: true,
          headers: { "Phone-Number": userPhone },
        });
        setAddresses([response.data]);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Handle change event for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to auto-fill the form with the selected address data
  const handleAddAddress = (savedAddress) => {
    setAddress({
      uHouseNumber: savedAddress.uHouseNumber,
      uArea: savedAddress.uArea,
      uZipCode: savedAddress.uZipCode,
      uCity: savedAddress.uCity,
    });
  };

  const handleDetectLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);

          setAddress({ ...address, latitude, longitude });
          console.log("Accuracy:", position.coords.accuracy);

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
            );
            console.log("******", response.data);

            if (response.data.results && response.data.results.length > 0) {
              const formattedAddress =
                response.data.results[0].formatted_address;
              setAddress({
                ...address,
                uArea: formattedAddress,
                latitude,
                longitude,
              });
            } else {
              console.error("No address found for the given coordinates.");
            }
          } catch (err) {
            console.error("Error fetching address:", err);
          }
        },
        (error) => {
          console.error("Error detecting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPhone = localStorage.getItem("userPhone");

    if (!userPhone) {
      alert("Please login to add an address");
      navigate("/");
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/address`, address, {
        headers: {
          "Phone-Number": userPhone, // Send the phone number in headers for the server
        },
        withCredentials: true,
      });
      console.log("address", address);

      alert("Address saved successfully!");
      navigate("/payment");
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="address-page">
      <h1>Add Delivery Address</h1>
      <button onClick={handleDetectLocation} className="gps-btn">
        Detect My Location
      </button>

      <h2>Saved Addresses</h2>
      <div>
        {addresses.length > 0 ? (
          addresses.map((savedAddress, index) => (
            <div key={index} className="saved-address">
              <p>{savedAddress.uHouseNumber}</p>
              <p>{savedAddress.uArea}</p>
              <p>{savedAddress.uCity}</p>
              <p>{savedAddress.uZipCode}</p>
              <button
                onClick={() => handleAddAddress(savedAddress)} // Auto-fill the form
                className="add-btn"
              >
                Add this address
              </button>
            </div>
          ))
        ) : (
          <p>No saved addresses found.</p>
        )}
      </div>

      {/* Address form */}
      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-group">
          <label>House Number</label>
          <input
            type="text"
            name="uHouseNumber"
            value={address.uHouseNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Area</label>
          <input
            type="text"
            name="uArea"
            value={address.uArea}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Zipcode</label>
          <input
            type="text"
            name="uZipCode"
            value={address.uZipCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="uCity"
            value={address.uCity}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Save Address & Proceed
        </button>
      </form>
    </div>
  );
};

export default Address;
