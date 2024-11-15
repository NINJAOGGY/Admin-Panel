// server/api/userRoutes.js
import express from 'express';
import { withAuth } from '../middleware/authMiddleware.js';
import { findOrCreateUser } from '../services/UserServices.js';
import { createClerkClient } from '@clerk/clerk-sdk-node';

const router = express.Router();
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

router.post('/sync', withAuth, async (req, res) => {
  try {
    const userId = req.userId;
    console.log('Syncing user with ID:', userId);

    // Get user data from Clerk
    const clerkUser = await clerk.users.getUser(userId);
    
    if (!clerkUser) {
      return res.status(404).json({ error: 'User not found in Clerk' });
    }

    // Find or create user in database
    const user = await findOrCreateUser({
      id: clerkUser.id,
      emailAddresses: clerkUser.emailAddresses,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName
    });

    res.json({ 
      message: 'User synced successfully',
      user: {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Error in sync endpoint:', error);
    res.status(500).json({ 
      error: 'Error syncing user',
      details: error.message 
    });
  }
});

export default router;