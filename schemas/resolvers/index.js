// /src/index/index.js
const fileResolvers = require('./fileResolvers');
const analysisReportResolvers = require('./analysisReportResolvers'); // 如果有其他模块 resolver，可以引入
const fieldResolvers = require('./fieldResolvers'); // 引入 Field 相关的 resolver


const index = {
    Query: {
        ...fileResolvers.Query,
        ...analysisReportResolvers.Query,
        ...fieldResolvers.Query,
    },
    Mutation: {
        ...fileResolvers.Mutation,
        ...analysisReportResolvers.Mutation,
        ...fieldResolvers.Mutation,
    },
};

module.exports = index;
