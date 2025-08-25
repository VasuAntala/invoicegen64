import mongoose from 'mongoose';

export async function mongooseConnection() {
  // Set Mongoose options
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect("mongodb+srv://vasuantala123:Vasu8283@cluster0.p1ilxej.mongodb.net/user");
    console.log('Database successfully connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}
