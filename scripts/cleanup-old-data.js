// Run this script to clean up old data without userId
// node scripts/cleanup-old-data.js

const mongoose = require('mongoose');

async function cleanup() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/doy-again');
    
    console.log('Connected to MongoDB');
    
    // Delete all stocks without userId
    const stocksResult = await mongoose.connection.collection('portfoliostocks').deleteMany({
      userId: { $exists: false }
    });
    
    console.log(`Deleted ${stocksResult.deletedCount} stocks without userId`);
    
    // Delete all transactions without userId
    const transactionsResult = await mongoose.connection.collection('transactions').deleteMany({
      userId: { $exists: false }
    });
    
    console.log(`Deleted ${transactionsResult.deletedCount} transactions without userId`);
    
    console.log('Cleanup complete!');
    
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await mongoose.disconnect();
  }
}

cleanup();
