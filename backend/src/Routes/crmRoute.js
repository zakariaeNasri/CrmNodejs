 import {
    addNewContact,
    getContact,
    getContactById,
    updateContact,
    deleteContact
} from "../Controllers/crmController"

import { loginRequired ,login,register } from "../Controllers/userController";
 const routes =(app)=>{
    app.route('/contact')
    .get((req,res,next)=>
    {
        //Middleware
        console.log(`Request from : ${req.originalUrl}`)
        console.log(`Request type : ${req.method}`)
        next();
    },loginRequired,getContact)
    .post(loginRequired,addNewContact);

    /********************/
    app.route('/contact/:contactID')
    //get One contact
        .get(loginRequired,getContactById)
    //updating spesific contact
        .put(loginRequired,updateContact)
    //deleteing specific contact
        .delete(loginRequired,deleteContact);
    //*************************************** */
    //AUthentication routes 
    app.route('/auth/register')
        .post(register);

    app.route('/login')
        .post(login);
}
export default routes;