//require("dotenv").config({path:"./env"});  this method destroy the consistancy of the file , so to solve this we use a different idea 
import dotenv from "dotenv";// now to do this 

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js"

import connectDB from "./db/index.js";

dotenv.config({path:"./env"});// and do this we need to change in the package.json file 

connectDB();




































/*

import express from "express";

const app = express();






(
    async () => {
        try {
            mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
            app.on("error",()=>{
                console.log("error",error);
                throw error;
            })
            app.listen(process.env.PORT,()=>{
                console.log(`app is running on port ${process.env.PORT}`)
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }
)()
    */    

// this above is the first approch 
 


