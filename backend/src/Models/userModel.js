import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const schema = mongoose.Schema;

export const UserSchema= new schema({
    username : {
        type: String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    hashPassword:{
        type:String,
        required:true
   },
    created_date:{
        type:Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = (password,hashPassword)=>
{
    return bcrypt.compareSync(password,hashPassword);
};