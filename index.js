import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import login_router from './routes/login.js';
import register_router from './routes/register.js';
import profile_router from './routes/get_profile.js';
import culprits_router from './routes/culprits.js';
//import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


//dotenv.config();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());
app.use('/login',login_router);
app.use('/register', register_router)
app.use('/profile', profile_router)
app.use('/culprits', culprits_router)
app.get('/', (req, res) =>{
    res.send("Welcome To Signal Verifier API Homepage");
});


const CONNECTION_URL = process.env.LOCALHOST_CONNECTION_URL;
const PORT = process.env.PORT || 5000;
console.log(CONNECTION_URL);

mongoose.connect(CONNECTION_URL, {useNewUrlParser:true,useUnifiedTopology:true })
.then(() => app.listen(PORT, () => console.log(`Server running port : ${PORT}`)))
.catch((err) =>console.log(err));


//mongoose.set(useFindAndModify, false);
