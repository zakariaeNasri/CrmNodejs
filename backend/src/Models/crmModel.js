import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

export const ContactSchema= new schema({
    firstName : {
        type: String,
        required: "Enter firstName"
    },
    lastName : {
        type: String,
        required:"Enter lastName"
    },
    email:{
        type:String,
        required:true
    },
    created_date:{
        type:Date,
        default: Date.now
    }
})