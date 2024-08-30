// /src/models/AnalysisReport.js
const mongoose = require('mongoose');

const AnalysisReportSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    analystId: {
        type: String,
        required: true,
    },
    outputTime: {
        type: Date,
        required: true,
    },
    detectionTimeRange: {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
    },
    abundanceThreshold: {
        type: Number,
        required: true,
    },
    notableBiomass: [String],
    fieldBiomassAbundance: [
        {
            fieldId: { type: String, required: true },
            abundance: { type: Number, required: true },
        },
    ],
    cloudReportLocation: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AnalysisReport', AnalysisReportSchema);
