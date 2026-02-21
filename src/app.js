import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();
// for configaration the cors
// this is for configuring the frontend port , by using cors we allow other port to access the backend and use the backend 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

// when we fill the form and the data will send in this way 
app.use(express.json({limit:"50kb"}))// it will tell the limitation for the app 

// now for the url 
app.use(express.urlencoded({extended:true,limit:"50kb"}))// 

app.use(express.static("public"))// it is a part that can be access by the public part 

// now we use cookie persar so it can access the cookies of the user and perform curd operation on then 
app.use(cookieParser())


export {app}