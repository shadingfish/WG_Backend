// /src/resolvers/resolvers.js
const fileResolvers = require('./fileResolvers');
const analysisReportResolvers = require('./analysisReportResolvers'); // 如果有其他模块 resolver，可以引入
const fieldResolvers = require('./fieldResolvers'); // 引入 Field 相关的 resolver

// 汇总所有模块的 resolvers
const resolvers = {
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

module.exports = resolvers;
