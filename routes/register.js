import express from 'express';
import {register} from '../controllers/register.js';

const ROUTER = express.Router();

ROUTER.post('/',register);

export default ROUTER;
