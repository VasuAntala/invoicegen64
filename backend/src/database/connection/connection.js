import mongoose from 'mongoose';

export async function mongooseConnection() {
  // Set Mongoose options
  mongoose.set('strictQuery', true);

  try {
    // Try to connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/invoicegen");
    console.log('✅ Database successfully connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 To fix this:');
    console.log('   1. Install MongoDB: https://docs.mongodb.com/manual/installation/');
    console.log('   2. Start MongoDB service: sudo systemctl start mongod');
    console.log('   3. Or use MongoDB Atlas (cloud): Update connection string');
    console.log('');
    console.log('🔄 Starting server without database connection for testing...');
    
    // Don't exit the process, let the server start without DB
    // The API will return errors when trying to access the database
  }
}
