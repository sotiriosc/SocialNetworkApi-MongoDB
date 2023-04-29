// Import required modules
const express = require('express');
const { connectionString } = require('./config/connection');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();

// Get the current working directory
const cwd = process.cwd();

// Set the server port number
const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

// Get the current activity (for logging purposes)
const activity = cwd.includes('01-Activities')
  ? cwd.split('/01-Activities/')[1]
  : cwd;

// Set up middleware to parse incoming request data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the application routes
app.use(routes);

// Connect to MongoDB using Mongoose
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the Mongoose connection object
const connection = mongoose.connection;

// Start the server once the connection to MongoDB is open
connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
