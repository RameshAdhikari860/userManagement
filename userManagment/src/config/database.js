import mongoose from "mongoose";


const mongoURI = process.env.PORT || "mongodb://localhost:27017/UserManagement"

const connectDB = async () => {
    try {
        const status = await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully at: ' + status.connection.host + ", and port: " + status.connection.port);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);  // Exit the process if we fail to connect
    }
};

export default connectDB;
