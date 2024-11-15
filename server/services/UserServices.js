// server/services/userService.js
import { User } from '../models/User.js';

export const findOrCreateUser = async (clerkUserData) => {
  try {
    // Try to find the user by clerkId
    let user = await User.findOne({ clerkId: clerkUserData.id });

    if (user) {
      // Update existing user
      user.firstName = clerkUserData.firstName || user.firstName;
      user.lastName = clerkUserData.lastName || user.lastName;
      user.email = clerkUserData.emailAddresses?.[0]?.emailAddress || user.email;
      await user.save();
      return user;
    }

    // Create new user if not found
    const primaryEmail = clerkUserData.emailAddresses?.[0]?.emailAddress;
    if (!primaryEmail) {
      throw new Error('No primary email found for user');
    }

    user = await User.create({
      clerkId: clerkUserData.id,
      email: primaryEmail,
      firstName: clerkUserData.firstName || '',
      lastName: clerkUserData.lastName || ''
    });

    return user;
  } catch (error) {
    console.error('Error in findOrCreateUser:', error);
    throw error;
  }
};