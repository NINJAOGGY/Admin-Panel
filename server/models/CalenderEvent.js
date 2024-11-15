// server/models/CalendarEvent.js
import mongoose from 'mongoose';

const calendarEventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  allDay: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);