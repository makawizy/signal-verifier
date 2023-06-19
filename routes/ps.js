
import express from 'express';
import { create_ps } from '../controllers/ps.js';

const ROUTER = express.Router();

ROUTER.post('/create_ps', create_ps);

export default ROUTER;