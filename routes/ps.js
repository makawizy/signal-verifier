
import express from 'express';
import { create_ps, get_ps, update_ps } from '../controllers/ps.js';

const ROUTER = express.Router();

ROUTER.post('/create_ps', create_ps);
ROUTER.post('/get_ps', get_ps);
ROUTER.patch('/update_ps/:id', update_ps);

export default ROUTER;