// /src/schemas/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

  type Field {
    id: ID!
    field: String!
    userId: String!
    updateTime: String!
    soilType: String!
    geoLocation: GeoLocation!
    cityOrTown: String!
    crops: [String]
  }

  type GeoLocation {
    topLeftX: Float!
    topLeftY: Float!
    BottomRightX: Float!
    BottomRightY: Float!
  }

  type Query {
    getAnalysisReports: [AnalysisReport]
    getAnalysisReport(id: ID!): AnalysisReport
    getAnalysisReportsByUserId(userId: String!): [AnalysisReport]
    getAnalysisReportsByAnalystId(analystId: String!): [AnalysisReport]
    
    getFields: [Field]
    getField(id: ID!): Field
    getFieldsByUserId(userId: String!): [Field]
  }

  type Mutation {
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

    addField(
      field: String!,
      userId: String!,
      updateTime: String!,
      soilType: String!,
      geoLocation: GeoLocationInput!,
      cityOrTown: String!,
      crops: [String]
    ): Field
  }

  input DetectionTimeRangeInput {
    start: String!
    end: String!
  }

  input FieldBiomassAbundanceInput {
    fieldId: String!
    abundance: Float!
  }

  input GeoLocationInput {
    topLeftX: Float!
    topLeftY: Float!
    BottomRightX: Float!
    BottomRightY: Float!
  }
`;

module.exports = typeDefs;
