import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/doy-again";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: CachedConnection = {
  conn: null,
  promise: null,
};

/**
 * Connect to MongoDB
 * Uses connection caching to avoid reconnecting on every request
 */
export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => {
        console.log("✓ Connected to MongoDB");
        return mongoose;
      })
      .catch((error) => {
        console.error("✗ Failed to connect to MongoDB:", error.message);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};
