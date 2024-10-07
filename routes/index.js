const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const { graphqlUploadExpress } = require('graphql-upload'); // 引入 graphql-upload 中间件
const connectDB = require('../config/db');
const typeDefs = require('../schemas/typeDefs');
const resolvers = require('../resolvers/resolvers');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })); // 设置最大文件大小和最大上传文件数量

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }), // 为文件上传操作添加上下文（context）
    uploads: false, // 禁用 Apollo Server 的内置上传功能，以使用 graphql-upload
});

const startServer = async () => {
    try {
        console.log('Starting Apollo Server...');
        await server.start();

        // Apply Apollo GraphQL middleware before other routes
        server.applyMiddleware({ app });
        console.log('Middleware applied.');

        // Static files and other routes
        app.use(express.static(path.join(__dirname, 'public')));

        // Start listening on specified port
        app.listen({ port: process.env.PORT || 4000 }, () => {
            console.log(`Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer()
    .then(() => console.log('ApolloServer start successfully'))
    .catch(err => console.error('ApolloServer start error:', err));










