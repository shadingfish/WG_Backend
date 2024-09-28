// /src/models/AnalysisReport.js
const mongoose = require('mongoose');

const AnalysisReportSchema = new mongoose.Schema({
    userId: {
        // The ID of the user (e.g., farmer) who registered in the system and owns this report
        type: String,
        required: true,
    },
    analystId: {
        // The ID of the bioinformatics analyst who generated this report based on genetic sequencing results
        type: String,
        required: true,
    },
    outputTime: {
        // The time the analysis report was uploaded or last modified
        type: Date,
        required: true,
    },
    detectionTimeRange: {
        // The time range during which the environmental samples were collected on the farm
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
    },
    abundanceThreshold: {
        // The threshold value used to indicate significant levels of biomass abundance for reporting
        type: Number,
        required: true,
    },
    notableBiomass: [String],
    // A list of notable organisms whose biomass was detected above the abundance threshold

    fieldBiomassAbundance: [
        {
            fieldId: {
                // The ID of the farm field where the sample was collected
                type: String,
                required: true
            },
            abundance: {
                // The measured abundance of biomass for the specific field, as determined by genetic sequencing
                type: Number,
                required: true
            },
        },
    ],
    cloudReportLocation: {
        // The cloud storage location (URL) where the full analysis report (e.g., PDF, CSV) is stored
        type: String,
        required: true,
    },
    summary: {
        // A brief summary of the analysis results, including potential pest threats and biomass information
        type: String,
        required: true,
    },
    createdAt: {
        // The timestamp when the report was initially created
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        // The timestamp when the report was last updated
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AnalysisReport', AnalysisReportSchema);
