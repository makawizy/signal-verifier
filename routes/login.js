import express from 'express';
import {signIn} from '../controllers/login.js';

const ROUTER = express.Router();

ROUTER.post('/',signIn);

export default ROUTER;
