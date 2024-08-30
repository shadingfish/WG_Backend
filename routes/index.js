const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

dotenv.config();
connectDB();

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.start().then(res => {
    server.applyMiddleware({ app });

    app.listen({ port: process.env.PORT || 4000 }, () =>
        console.log(`Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
    );
});
