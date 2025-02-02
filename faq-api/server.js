// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const faqRoutes = require('./routes/faqRoutes');
const Redis = require('ioredis');
const cors = require('cors');
require('dotenv').config();



// Initialize express app
const app = express();

// Use body-parser to parse incoming JSON requests
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your React app URL
}));

// MongoDB connection string from .env
const mongoURI = process.env.MONGO_URI;

// Redis connection setup
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,  // default Redis port
  password: process.env.REDIS_PASSWORD || '', // optional, depending on your setup
});

// Check Redis connection
redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Use faqRoutes for handling FAQ-related API routes
app.use('/api', faqRoutes);

// Start the Express server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
