import mongoose from "mongoose";
    
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\nMongoDB connected : ${connectionInstance.connection.host} ${connectionInstance.connection.name}`);
    } catch (err) {
        console.log("MONGODB connection FAILED ", err);
        process.exit(1)
    }
}

export default connectDB