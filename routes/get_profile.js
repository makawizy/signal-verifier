import express from 'express';
import {profile} from '../controllers/get_profile.js';

const ROUTER = express.Router();

ROUTER.post('/',profile);

export default ROUTER;
