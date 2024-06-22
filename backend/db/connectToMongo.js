import mongoose from "mongoose";

const connectToMongoDb=async()=>{
    try {
        await  mongoose.connect(process.env.MONGO_DB_URI)
        console.log('connected To MongoDb');
    } catch (error) {
        console.log('Error In MongoDb',error.message)
    }
}
export default connectToMongoDb