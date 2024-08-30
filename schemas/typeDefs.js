// /src/schemas/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type AnalysisReport {
    id: ID!
    userId: ID!
    analystId: ID!
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
    fieldId: ID!
    abundance: Float!
  }

  type Query {
    getAnalysisReports: [AnalysisReport]
    getAnalysisReport(id: ID!): AnalysisReport
  }

  type Mutation {
    addAnalysisReport(
      userId: ID!,
      analystId: ID!,
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
    fieldId: ID!
    abundance: Float!
  }
`;

module.exports = typeDefs;
