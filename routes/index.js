// index.js

const express = require('express');
const dotenv = require('dotenv');
const { graphqlUploadExpress } = require('graphql-upload'); // Import graphql-upload middleware for handling file uploads
const connectDB = require('../config/db'); // Your MongoDB connection setup
const { buildSchema } = require('graphql'); // Import buildSchema if your schema is a string type definition (SDL)
const { createHandler } = require('graphql-http/lib/use/express'); // Import graphql-http handler for Express
const typeDefs = require('../schemas/typeDefs'); // Your GraphQL type definitions (SDL)
const resolvers = require('../schemas/resolvers'); // Your GraphQL resolvers
const path = require('path');

dotenv.config();

const app = express();

// MongoDB Connection
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Middleware for handling file uploads
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })); // Set max file size and max upload file count

// Build schema using type definitions (if necessary)
const schema = buildSchema(typeDefs); // If typeDefs is a string with SDL, use buildSchema to create schema

// Set up GraphQL HTTP handler for /graphql endpoint
app.use('/graphql', createHandler({
    schema, // Your existing schema object
    rootValue: resolvers, // Resolvers for your queries and mutations
    context: ({ req }) => ({ req }), // Optional context (if needed)
}));

// Serve static files and other routes (if any)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
});

// WITH APOLLO SERVER
// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const dotenv = require('dotenv');
// const { graphqlUploadExpress } = require('graphql-upload'); // 引入 graphql-upload 中间件
// const connectDB = require('../config/db');
// const typeDefs = require('../schemas/typeDefs');
// const resolvers = require('../resolvers/resolvers');
// const path = require('path');
// const bodyParser = require('body-parser');
//
// dotenv.config();
//
// const app = express();
// app.use(bodyParser.json());
//
// // Connect to MongoDB
// connectDB()
//     .then(() => console.log('Database connected successfully'))
//     .catch(err => console.error('Database connection error:', err));
//
// app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })); // 设置最大文件大小和最大上传文件数量
//
// // Initialize Apollo Server
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => ({ req }), // 为文件上传操作添加上下文（context）
//     uploads: false, // 禁用 Apollo Server 的内置上传功能，以使用 graphql-upload
// });
//
// const startServer = async () => {
//     try {
//         console.log('Starting Apollo Server...');
//         await server.start();
//
//         // Apply Apollo GraphQL middleware before other routes
//         server.applyMiddleware({ app });
//         console.log('Middleware applied.');
//
//         // Static files and other routes
//         app.use(express.static(path.join(__dirname, 'public')));
//
//         // Start listening on specified port
//         app.listen({ port: process.env.PORT || 4000 }, () => {
//             console.log(`Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
//         });
//     } catch (error) {
//         console.error('Error starting server:', error);
//     }
// };
//
// startServer()
//     .then(() => console.log('ApolloServer start successfully'))
//     .catch(err => console.error('ApolloServer start error:', err));
