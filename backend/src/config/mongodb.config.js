import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "linkly-db",
        });
        console.log(`-----MongoDB Connected-----`);
    } catch (error) {
        console.error(`Error in mongoDB connection -----> ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;