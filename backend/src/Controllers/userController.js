import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { UserSchema } from "../Models/userModel";


const User =mongoose.model('User',UserSchema);

export const loginRequired =(req,res,next)=>
{
    if(req.user)
    {
        next();
    }
    else
    {
        return res.status(401).json({message : 'Unauthorized user !'});
    }
}


export const register =(req,res)=>{
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err,user) =>{
        if(err){
            return res.status(400).send({
                message:err
            });
        }else
        {
            user.hashPassword=undefined;
            return res.json(user);
        }
    })
}

export const login = (req, res) =>{
    const jwt =require("jsonwebtoken");
    User.findOne({
        email : req.body.email
    }, (err,user) =>
    {
        if (err) throw err;
        if(!user){
            res.status(401).json({ message :'AUth failed. no user found !'})
        }else if (user){
            if(!user.comparePassword(req.body.password, user.hashPassword)){
                res.status(401).json({message: 'Auth failed. wrong password !'});
            }else
            {
                return res.json({
                    token: jwt.sign({
                        email :user.email ,
                        username :user.username,
                        _id: user.id
                    },'SignToken')
                });
            }
        }
    } )
}