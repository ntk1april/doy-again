// Run this script to clean up old data without userId
// node scripts/cleanup-old-data.js

const mongoose = require("mongoose");

async function cleanup() {
  try {
    // Connect to MongoDB
    await mongoose.connect("your_mongodb_uri");

    console.log("Connected to MongoDB");

    // Delete all users
    // const usersResult = await mongoose.connection
    //   .collection("users")
    //   .deleteMany({});

    // console.log(`Deleted ${usersResult.deletedCount} users`);

    // Delete all stocks
    const stocksResult = await mongoose.connection
      .collection("portfoliostocks")
      .deleteMany({});

    console.log(`Deleted ${stocksResult.deletedCount} stocks`);

    // Delete all transactions
    const transactionsResult = await mongoose.connection
      .collection("transactions")
      .deleteMany({});

    console.log(`Deleted ${transactionsResult.deletedCount} transactions`);

    // Delete all wishlists
    const wishlistsResult = await mongoose.connection
      .collection("wishlists")
      .deleteMany({});

    console.log(`Deleted ${wishlistsResult.deletedCount} wishlists`);

    console.log("Cleanup complete!");
  } catch (error) {
    console.error("Error during cleanup:", error);
  } finally {
    await mongoose.disconnect();
  }
}

cleanup();
