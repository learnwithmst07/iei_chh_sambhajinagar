require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const eventRoutes = require('./routes/eventRoutes');
const highlightRoutes = require('./routes/highlightRoutes');
const guestHouseRoutes = require('./routes/guestHouseRoutes');
const galleryRoutes = require('./routes/gallery');
const messageRoutes = require('./routes/messageRoutes');

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'IEI Website Backend API',
    status: 'Running'
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/highlights', highlightRoutes);
app.use('/api/guesthouse', guestHouseRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/messages', messageRoutes);

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
