import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/login.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());
app.use('/login',router);

app.get('/', (req, res) =>{
    res.send("Welcome To Signal Verifier API Homepage");
});


const CONNECTION_URL = process.env.LOCALHOST_CONNECTION_URL;
const PORT = process.env.PORT || 5000;
console.log(CONNECTION_URL);
mongoose.connect(CONNECTION_URL, {useNewUrlParser:true,useUnifiedTopology:true })
.then(() => app.listen(PORT, () => console.log(`Server running port : ${PORT}`)))
.catch((err) =>console.log(err.message));

//mongoose.set(useFindAndModify, false);