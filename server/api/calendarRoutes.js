// server/api/calendarRoutes.js
import express from 'express';
import {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
} from '../services/CalenderService.js';
import { withAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the authentication middleware to all routes
router.use(withAuth);

// Get all events for the authenticated user
router.get('/events', async (req, res) => {
  const userId = req.userId;
  try {
    const events = await getEvents(userId);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new event for the authenticated user
router.post('/events', async (req, res) => {
  const userId = req.userId;
  const eventData = { ...req.body, userId };

  try {
    const event = await addEvent(eventData);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an event for the authenticated user
router.put('/events/:eventId', async (req, res) => {
  const userId = req.userId;
  const { eventId } = req.params;
  const eventData = req.body;

  try {
    const event = await updateEvent(userId, eventId, eventData);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an event for the authenticated user
router.delete('/events/:eventId', async (req, res) => {
  const userId = req.userId;
  const { eventId } = req.params;

  try {
    await deleteEvent(userId, eventId);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;