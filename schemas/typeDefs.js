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
  
  
  
  # 文件类型定义
  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
    createdAt: String!
    updatedAt: String!
  }

  # 文件上传时的输入类型
  input FileUploadInput {
    filename: String!
    mimetype: String!
    encoding: String!
    content: String! # base64 编码的文件内容
  }

  # 文件更新时的输入类型
  input FileUpdateInput {
    id: ID!
    filename: String
    mimetype: String
    encoding: String
    content: String # base64 编码的文件内容
  }

  # 定义 Mutation 用于文件操作
  extend type Mutation {
    uploadFile(file: FileUploadInput!): File!
    updateFile(file: FileUpdateInput!): File!
    deleteFile(id: ID!): String!
  }

  # 定义 Query 用于查询文件
  extend type Query {
    getFile(id: ID!): File
    getFiles: [File]
  }
`;

module.exports = typeDefs;
