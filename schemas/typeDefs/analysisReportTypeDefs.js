// const { gql } = require('apollo-server-express');
// const analysisReportTypeDefs = gql` if using apollo

const analysisReportTypeDefs = `
    type AnalysisReport {
        id: ID!
        userId: String!
        analystId: String!
        outputTime: String!
        detectionTimeRange: DetectionTimeRange!
        abundanceThreshold: Float!
        notableBiomass: [String]
        fieldBiomassAbundance: [FieldBiomassAbundance]
        cloudReportLocation: String!
        summary: String!
        createdAt: String
        updatedAt: String
    }

    type DetectionTimeRange {
        start: String!
        end: String!
    }

    type FieldBiomassAbundance {
        fieldId: String!
        abundance: Float!
    }

    extend type Query {
        getAnalysisReports: [AnalysisReport]
        getAnalysisReport(id: ID!): AnalysisReport
        getAnalysisReportsByUserId(userId: String!): [AnalysisReport]
        getAnalysisReportsByAnalystId(analystId: String!): [AnalysisReport]
    }

    extend type Mutation {
        addAnalysisReport(
            userId: String!,
            analystId: String!,
            outputTime: String!,
            detectionTimeRange: DetectionTimeRangeInput!,
            abundanceThreshold: Float!,
            notableBiomass: [String],
            fieldBiomassAbundance: [FieldBiomassAbundanceInput],
            cloudReportLocation: String!,
            summary: String!
        ): AnalysisReport
    }

    input DetectionTimeRangeInput {
        start: String!
        end: String!
    }

    input FieldBiomassAbundanceInput {
        fieldId: String!
        abundance: Float!
    }
`;

module.exports = analysisReportTypeDefs;
