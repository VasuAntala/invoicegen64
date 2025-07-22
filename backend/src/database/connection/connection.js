import mongoose from 'mongoose';

export async function mongooseConnection() {
  // Set Mongoose options
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log('Database successfully connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}
