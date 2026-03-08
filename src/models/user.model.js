import mongoose,{Schema}from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,// this make the field searchable (it will optimise the searching field)

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true
    },
    fullname :{
        type: String,
        required: true,
        trim: true,
        index: true

    },
    avatar:{
        type: String,// here we will use a url and the main image of the avetar store in cloudnary
        required: true,
    },
    coverimage:{
        type: String,
        

    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"

        }
    ],
    password:{
        type: String,
        required:[true,"password is required"]// giving a custom error message
    },
    refereshToken:{
        type: String,

    },


}, {timestamps:true})

userSchema.pre("save", async function (next) {
    // here we write the code of encryption using bcrypt
    if(!this.isModified("password")){
        return next();
        // here in this logic we check the negative , if password is not changed then move to next 

    }
    // if changed then encrypt it 
    this.password = await bcrypt.hash(this.password, 10);
    next();

})
// creating a method to comapre the 2 password 
userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)// it will return true and false 

}

userSchema.methods.generateAccesstoken = function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
        
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRES}
)

}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRES}
)


}

export const User = mongoose.model("User",userSchema)