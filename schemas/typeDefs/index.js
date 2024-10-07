const { mergeTypeDefs } = require('@graphql-tools/merge');
const analysisReportTypeDefs = require('./analysisReportTypeDefs');
const fieldTypeDefs = require('./fieldTypeDefs');
const fileTypeDefs = require('./fileTypeDefs');

// Merge typeDefs
const typeDefs = mergeTypeDefs([analysisReportTypeDefs, fieldTypeDefs, fileTypeDefs]);

module.exports = typeDefs;
