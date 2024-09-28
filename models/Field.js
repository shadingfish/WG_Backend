const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
    field: { //Field Nickname
        type: String,
        required: true,
    },
    userId: { //Farmer ID (you can make up hex values for now) - user's ID
        type: String,
        required: true,
    },
    updateTime: { // the latest time that the data is created or modified
        type: Date,
        required: true,
        default: Date.now,
    },
    soilType: { //Soil Type
        type: String,
        required: true,
    },
    geoLocation: { //Geolocation (Two Lat/Longitude coords representing the top left and bottom right corners of a polygonal area)
        topLeftX: { type: Number, required: true },
        topLeftY: { type: Number, required: true },
        BottomRightX: { type: Number, required: true },
        BottomRightY: { type: Number, required: true },
    },
    cityOrTown: { //(would be theoretically derivable from the top left latlong coordinate
        type: String,
        required: true,
    },
    crops: [String] //List of ids of crops grown
})

module.exports = mongoose.model('Field', FieldSchema);
