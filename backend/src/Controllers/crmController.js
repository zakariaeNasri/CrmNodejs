import mongoose from "mongoose";
import { ContactSchema } from "../Models/crmModel";

const Contact = mongoose.model('Contact',ContactSchema);
export const addNewContact=(req,res)=>{
    let newContact = new Contact(req.body);
    newContact.save((err,Contact)=>{
        if(err){
            res.send(err);
        }
        res.json(Contact);
    });
}
export const getContact=(req,res)=>{

    Contact.find({},(err,Contact)=>{
        if(err){
            res.send(err);
        }
        res.json(Contact);
    })
}

export const getContactById=(req,res)=>{
    
    Contact.findById(req.params.contactID,(err,Contact)=>{
        if(err){
            res.send(err);
        }
        res.json(Contact);
    })
}

export const updateContact=(req,res)=>{
    
    Contact.findOneAndUpdate({_id:req.params.contactID},req.body,{ new:true , useFindAndModify: false},(err,Contact)=>{
        if(err){
            res.send(err);
        }
        res.json(Contact);
    })
}

export const deleteContact=(req,res)=>{
    
    Contact.remove({_id : req.params.contactID},(err,Contact)=>{
        if(err){
            res.send(err);
        }
        res.json({message:'Contact deleted successfuly'});
    })
}

