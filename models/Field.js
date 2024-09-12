const mongoose = require('mongoose');

// Note:
//
//     This is solely a backend task. Should not need ANY CHANGES to the frontend whatsoever (separate task for later).
//
// Completed If:
//
//     A list of fields exist in MongoDB, with the following data fields:
//
//     Field Nickname
//
// Farmer ID (you can make up hex values for now)
//
//     Soil Type
//
// Geolocation (Two Lat/Longitude coords representing the top left and bottom right corners of a polygonal area, feel free to dm me if unclear)
//
//     City/town name (would be theoretically derivable from the top left latlong coordinate)
//
// List of crops grown (make up ids for the crops, dont include actual names
//
// Reference:

const FieldSchema = new mongoose.Schema({
    field: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    updateTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    soilType: {
        type: String,
        required: true,
    },
    geoLocation: {
        topLeftX: { type: Number, required: true },
        topLeftY: { type: Number, required: true },
        BottomRightX: { type: Number, required: true },
        BottomRightY: { type: Number, required: true },
    },
    cityOrTown: {
        type: String,
        required: true,
    },
    crops: [String]
})

module.exports = mongoose.model('Field', FieldSchema);
