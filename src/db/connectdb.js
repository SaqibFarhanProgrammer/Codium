import mongoose from 'mongoose';

const MONGODB_URI = `${process.env.MONGODB_CONNECT_URL}/${process.env.DB_NAME}`;

async function connectdb() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Mongoose connected to DB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

export default connectdb;
