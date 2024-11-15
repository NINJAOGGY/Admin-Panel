// server/lib/mongodb.js
import mongoose from 'mongoose';

console.log('MONGO_URL:', process.env.MONGO_URL);


if (!process.env.MONGO_URL) {
  throw new Error('Please add the MONGO_URL environment variable');
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;