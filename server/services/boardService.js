// server/services/boardService.js
import { Board } from '../models/Board.js';

export const getBoard = async (userId) => {
  try {
    let board = await Board.findOne({ userId });
    
    if (!board) {
      // Create default board if none exists
      board = await Board.create({
        userId,
        columns: [
          { id: '1', title: 'TODO', cards: [] },
          { id: '2', title: 'Doing', cards: [] },
          { id: '3', title: 'Completed', cards: [] },
          { id: '4', title: 'Backlog', cards: [] }
        ]
      });
    }
    
    return board;
  } catch (error) {
    throw new Error(`Error fetching board: ${error.message}`);
  }
};

export const updateBoard = async (userId, boardData) => {
  try {
    const board = await Board.findOneAndUpdate(
      { userId },
      { 
        columns: boardData.columns,
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );
    return board;
  } catch (error) {
    throw new Error(`Error updating board: ${error.message}`);
  }
};