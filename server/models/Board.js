// server/models/Board.js
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String
});

const columnSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cards: [cardSchema]
});

const boardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  columns: [columnSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Board = mongoose.model('Board', boardSchema);