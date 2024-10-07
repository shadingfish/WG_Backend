// /src/schemas/resolvers.js
const AnalysisReport = require('../models/AnalysisReport');

const analysisReportResolvers = {
    Query: {
        getAnalysisReports: async () => {
            return AnalysisReport.find();
        },
        getAnalysisReport: async (_, { id }) => {
            return AnalysisReport.findById(id);
        },
        getAnalysisReportsByUserId: async (_, { userId }) => {
            return AnalysisReport.find({ userId });
        },
        getAnalysisReportsByAnalystId: async (_, { analystId }) => {
            return AnalysisReport.find({ analystId });
        }
    },

    Mutation: {
        addAnalysisReport: async (_, args) => {
            const newReport = new AnalysisReport(args);
            try {
                const savedReport = await newReport.save();
                return savedReport;
            } catch (error) {
                console.error("Error saving report:", error);
                throw new Error("Error saving the report to the database");
            }
        },
    }
};

module.exports = analysisReportResolvers;
