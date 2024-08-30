// /src/models/AnalysisReport.js
const mongoose = require('mongoose');

const AnalysisReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    analystId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Analyst',
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
    notableBiomass: [{
        type: String,
    }],
    fieldBiomassAbundance: [{
        fieldId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Field',
            required: true,
        },
        abundance: {
            type: Number,
            required: true,
        }
    }],
    cloudReportLocation: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('AnalysisReport', AnalysisReportSchema);
