// /src/schemas/resolvers.js
const AnalysisReport = require('../models/AnalysisReport');

const resolvers = {
    Query: {
        getAnalysisReports: async () => {
            return AnalysisReport.find();
        },
        getAnalysisReport: async (_, { id }) => {
            return AnalysisReport.findById(id);
        },
    },
    Mutation: {
        addAnalysisReport: async (_, args) => {
            const newReport = new AnalysisReport(args);
            console.log("Saving report: " + JSON.stringify(args));
            try {
                const savedReport = await newReport.save();
                console.log("Report saved successfully.");
                return savedReport;
            } catch (error) {
                console.error("Error saving report:", error);
                throw new Error("Error saving the report to the database");
            }
        },
    },
};

module.exports = resolvers;
