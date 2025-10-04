const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

// Middleware & App Setup
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body

// Routes
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(); // wait for DB connection
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); // start server
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // exit process if DB fails
  }
};

startServer();
