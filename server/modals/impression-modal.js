const mongoose = require('mongoose');

const ImpressionSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    visitCount: {
        type: Number,
        default: 1, // Default to 1 on the first visit
    },
});

const Impression = mongoose.model('Impression', ImpressionSchema);

module.exports = Impression;

