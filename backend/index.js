import express from "express";
import routes from "./src/Routes/crmRoute";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jsonwebtoken from 'jsonwebtoken';


const app = express();
const PORT=4000;

//Mongoose Connection
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/CrmDb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//body parser setup
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//JWT JSON WEB TOKEN SETUP
app.use((req,res,next) =>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1],'SignToken',(err,decode) =>
        {
            if(err) req.user = undefined;
            req.user = decode;
            next();
        });
    }
    else
    {
        req.user = undefined;
        next();
    }
})

routes(app);

//Static Files serving
app.use(express.static("public"));

app.get('/',(req,res)=>
    res.send(`Node and express server running on ${PORT}`)
);

app.listen(PORT,()=>

    console.log(`We are here on Port ${PORT} :)`)
);