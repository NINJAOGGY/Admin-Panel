// server/index.js
import './config.js';
import express from 'express';
import cors from 'cors';
import calendarRoutes from './api/calendarRoutes.js';
import boardRoutes from './api/boardRoutes.js'
import userRoutes from './api/userRoutes.js';
import connectDB from './lib/mongodb.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', calendarRoutes);
app.use('/api', boardRoutes)
app.use('/api/users', userRoutes);
app.use(
  cors({
    origin: 'http://localhost:5173', // Adjust based on your frontend URL
    credentials: true,
  })
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});