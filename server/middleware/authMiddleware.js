// server/middleware/authMiddleware.js
import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerk = createClerkClient({ 
  secretKey: process.env.CLERK_JWT_KEY 
});

export const withAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.error('No authorization header provided');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Important: Add space after 'Bearer'
    const token = authHeader.replace('Bearer ', '').trim();

    try {
      const decodedToken = await clerk.verifyToken(token);
      
      if (!decodedToken || !decodedToken.sub) {
        console.error('Invalid token - no user ID');
        return res.status(401).json({ error: 'Unauthorized' });
      }

      req.userId = decodedToken.sub;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};