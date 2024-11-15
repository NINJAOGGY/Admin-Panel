// server/api/boardRoutes.js
import express from 'express';
import { withAuth } from '../middleware/authMiddleware.js';
import { getBoard, updateBoard } from '../services/boardService.js';

const router = express.Router();

// Get board
router.get('/board', withAuth, async (req, res) => {
  try {
    const board = await getBoard(req.userId);
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update board
router.put('/board', withAuth, async (req, res) => {
  try {
    const board = await updateBoard(req.userId, req.body);
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;