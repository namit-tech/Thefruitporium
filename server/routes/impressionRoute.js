const express = require('express');
const router = express.Router();
const Impression = require('../modals/impression-modal');

router.post('/impression', async (req, res) => {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];

    try {
        // Check if an impression for this IP already exists
        let impression = await Impression.findOne({ ip });

        if (impression) {
            // If the impression exists, increment the visitCount
            impression.visitCount += 1;
            impression.timestamp = new Date(); // Update the timestamp to the latest visit
            await impression.save();
        } else {
            // If no impression exists, create a new entry
            impression = new Impression({
                ip,
                userAgent,
                timestamp: new Date(),
                visitCount: 1,
            });
            await impression.save();
        }

        res.status(200).json({ message: 'Impression saved successfully!', visitCount: impression.visitCount });
    } catch (err) {
        console.error('Error saving impression:', err);
        res.status(500).json({ message: 'Error saving impression' });
    }
});

router.get('/impression', async (req, res) => {
    try {
        // Sum up all the `visitCount` values in the collection
        const totalImpressions = await Impression.aggregate([
            {
                $group: {
                    _id: null, // Grouping all documents together
                    totalCount: { $sum: "$visitCount" } // Summing the `visitCount` field
                }
            }
        ]);
        console.log("impre", totalImpressions);

        const visitCount = totalImpressions[0]?.totalCount || 0;
        console.log("visitcount", visitCount);
        
        res.status(200).json({ visitCount });
    } catch (err) {
        console.error('Error fetching impressions:', err);
        res.status(500).json({ message: 'Error fetching impressions' });
    }
});

module.exports = router;

