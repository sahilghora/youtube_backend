// this is the 2nd part of the asynchandler , it is a utility function that will handel the code of conncetion and etc we will learn about this again 


const asyncHandler = (requestHandler)=>{(req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
}}

export {asyncHandler}


















/*   first method 
// here we create a higher order function that is known as asynchandler and we build this to handel the backend most used code 
// this is a wrapper function using try and catch , we use this because we need it a lot of time 
const asyncHandler = (fn)=>async(req,res,next)=>{
    try {
        await fn(req,res,next)
        
    } catch (error) {
        res.status(error.code ||500 ).json({
            success:false,
            message:error.message,
        })
        
    }
}  */