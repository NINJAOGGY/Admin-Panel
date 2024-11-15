// server/services/calendarService.js
import { CalendarEvent } from '../models/CalenderEvent.js';

export const addEvent = async (eventData) => {
  try {
    const event = await CalendarEvent.create(eventData);
    return {
      id: event._id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };
  } catch (error) {
    throw new Error(`Error creating event: ${error.message}`);
  }
};

export const getEvents = async (userId) => {
  try {
    const events = await CalendarEvent.find({ userId });
    return events.map(event => ({
      id: event._id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    }));
  } catch (error) {
    throw new Error(`Error fetching events: ${error.message}`);
  }
};

export const deleteEvent = async (userId, eventId) => {
  try {
    await CalendarEvent.findOneAndDelete({ userId, _id: eventId });
    return true;
  } catch (error) {
    throw new Error(`Error deleting event: ${error.message}`);
  }
};

export const updateEvent = async (userId, eventId, eventData) => {
  try {
    const event = await CalendarEvent.findOneAndUpdate(
      { userId, _id: eventId },
      eventData,
      { new: true }
    );
    return {
      id: event._id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    };
  } catch (error) {
    throw new Error(`Error updating event: ${error.message}`);
  }
};