import mongoose,{Schema}from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";// importing it 


const videoSchema = new Schema({
    videofile:{
        type:String,
        required:true,

    },
    thumbnail:{
        type:String,
        required:true,

    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    views:{
        type:Number,
        default:0,
    },
    ispublished:{
        type:Boolean,
        default:true,

    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }




   

}, {timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)// here we use the aggregation pipeline 
export const Video = mongoose.model("Video",videoSchema)