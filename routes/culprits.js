import express from 'express';
import {culprits} from '../controllers/culprits.js';

const ROUTER = express.Router();

ROUTER.post('/',culprits);

export default ROUTER;
