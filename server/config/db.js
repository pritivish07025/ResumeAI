import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Drop the problematic username index if it exists
    try {
      const db = mongoose.connection.db;
      const usersCollection = db.collection("users");
      
      // Get all indexes
      const indexes = await usersCollection.listIndexes().toArray();
      const hasUsernameIndex = indexes.some(index => index.name === "username_1");
      
      if (hasUsernameIndex) {
        console.log("Dropping problematic username_1 index...");
        await usersCollection.dropIndex("username_1");
        console.log("Username index dropped successfully");
      }
    } catch (indexError) {
      console.log("Index check/drop note:", indexError.message);
    }
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
