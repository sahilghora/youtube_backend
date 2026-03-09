// here we are going to build router 
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    // here we use the upload middle ware that work on multer , and this multer work for file handling and store the file  it execute befour registeruser
    upload.fields([{name:"avatar",maxCount:1},{name:"coverimage",maxCount:1}]),
    registerUser)



export default router;