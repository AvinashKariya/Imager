import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
