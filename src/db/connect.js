import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        console.log("Connectiong to:", process.env.TODOLIST_URI + DB_NAME);

        const connInstance = await mongoose.connect(`${process.env.TODOLIST_URI}/${DB_NAME}`)
        console.log("COnnected to:" , connInstance.connection.host)
        
    } catch (error) {
        console.log("Database Connection FAILED", error);
        process.exit(1);
    }
}

export default connectDB;