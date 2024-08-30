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
            return await newReport.save();
        },
    },
};

module.exports = resolvers;
