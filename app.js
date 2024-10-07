// app.js

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

// Initialize express app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Import and setup GraphQL HTTP middleware
const { createHandler } = require('graphql-http/lib/use/express');  // Import GraphQL HTTP handler for Express
const { schema } = require('schemas/typeDefs');  // Import your GraphQL schema

// GraphQL endpoint
app.use('/graphql', createHandler({ schema }));

// Catch 404 and forward to error handler
// NOTE: Make sure this is after all your route definitions
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
