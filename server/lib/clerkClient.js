// server/lib/clerkClient.js
import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_JWT_KEY });

export default clerkClient;