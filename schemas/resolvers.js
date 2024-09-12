// /src/schemas/resolvers.js
const AnalysisReport = require('../models/AnalysisReport');
const Field  = require('../models/Field');

const resolvers = {
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
        },

        getFields: async () => {
            return Field.find();
        },
        getField: async (_, { id }) => {
            return Field.findById(id);
        },
        getFieldsByUserId: async (_, { userId }) => {
            return Field.find({userId});
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

        addField: async (_, args) => {
            const newField = new Field({
                ...args,
                updateTime: new Date()
            });
            try {
                const savedField = await newField.save();
                return savedField;
            } catch (error) {
                console.error("Error saving field:", error);
                throw new Error("Error saving the field to the database");
            }
        }
    }
};

module.exports = resolvers;
