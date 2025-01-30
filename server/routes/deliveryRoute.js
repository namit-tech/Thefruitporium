const express = require('express');
const router = express.Router();

const SHOP_LATITUDE = 28.712770; // Replace with your shop's latitude
const SHOP_LONGITUDE = 77.172749; // Replace with your shop's longitude
const DELIVERY_RADIUS = 10; // Delivery radius in kilometers

// Function to calculate distance between two coordinates
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (angle) => (Math.PI / 180) * angle;

  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

router.post('/check-delivery', (req, res) => {
    console.log('Incoming request to /check-delivery:', req.body);
    const { userLat, userLon } = req.body;
  
    if (!userLat || !userLon) {
      console.log('Invalid request: Missing latitude or longitude.');
      return res.status(400).json({ message: 'Latitude and Longitude are required.' });
    }
  
    const distance = haversineDistance(SHOP_LATITUDE, SHOP_LONGITUDE, userLat, userLon);
    console.log(`Calculated distance: ${distance} km`);
  
    if (distance <= DELIVERY_RADIUS) {
      console.log('Delivery is possible.');
      res.json({ isDeliverable: true, distance });
    } else {
      console.log('Delivery is not possible.');
      res.json({ isDeliverable: false, distance });
    }
  });
  

module.exports = router;

