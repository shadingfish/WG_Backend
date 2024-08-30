const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const typeDefs = require('../schemas/typeDefs');
const resolvers = require('../schemas/resolvers');
const path = require('path');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
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










