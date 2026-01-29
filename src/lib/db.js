import mongoose from 'mongoose';

async function connectDB() {
  try {
    const db = await mongoose.connect('mongodb://localhost:27017/');
    console.log(db);
    
  } catch (error) {
    throw new ApiError('faild to connect Database', 500);
  }
}

export default connectDB