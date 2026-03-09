import { asyncHandler } from "../utils/asyncHandler.js";  
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



// here we create a method that will send 200 when the register is done 
const registerUser = asyncHandler(async (req,res)=>{
    //1. get the user data 
    const {fullName,email,username,password} = req.body;
    console.log("email",email);

    //2. using the validation 
    if(
    [fullName, email, username, password].some(
        (field) => field?.trim() === ""
    )
){
    throw new ApiError(400, "All fields are required")
}

//3. check the user is already exist or not 
// here we take the user from the user.model.js and then try to find if it is in the user databse or not and here we also use $or operator for checking various fields
const existeduser=User.findOne({
    $or : [{email},{username}]
})


if(existeduser){
    throw new ApiError(409,"user already exist ")

}
// 4. check if the local image and the avatar file is happend 

const avatarlocalpath=req.files?.avatar[0]?.path;
const coverimagelocalpath=req.files?.coverimage[0]?.path;

if(!avatarlocalpath || !coverimagelocalpath){
    throw new ApiError(400,"avatar file is required and also the cover image is required")
}
// upload on cloudnary 
const avatar = await uploadOnCloudinary(avatarlocalpath);
const coverimage = await uploadOnCloudinary(coverimagelocalpath);

if(!avatar || !coverimage){
    throw new ApiError(400,"avatar not availabe")}


// create the user 
const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverimage: coverimage.url,
    email,
    username: username.toLowerCase(),
    password,

})
// check if the user is available or not and we also select what we also dont want 

const createduser=await User.findById(user._id).select(
    "-password -refereshToken"

)

if(!createduser){
    throw new ApiError(500,"something went wrong ")

}
// sending the api response
return res.status(201).json(
    new ApiResponse(200,createduser,"user created successfully")
)





   
    
    
})

export {registerUser}