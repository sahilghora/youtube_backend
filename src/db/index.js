// here we  are going to see the 2nd approch of connecting the database and the server 
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=>{
    try{
        const connectioninstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(` \n mongo db connected : ${connectioninstance.connection.host}`)

    }catch(error){
        console.log("mongo db connection error",error)
        process.exit(1);
    

    }
}

export default connectDB;