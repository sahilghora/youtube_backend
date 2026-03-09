import { asyncHandler } from "../utils/asyncHandler.js";  

// here we create a method that will send 200 when the register is done 
const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message : "ok this is the end"
    })
})

export {registerUser}