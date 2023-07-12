
import express from 'express';
import { create_ps, get_ps, update_ps, take_ps, insert_loadRecords } from '../controllers/ps.js';

const ROUTER = express.Router();

ROUTER.post('/create_ps', create_ps);
ROUTER.post('/get_ps', get_ps);
ROUTER.patch('/update_ps/:id', update_ps);
ROUTER.patch('/take_ps/:id', take_ps);
ROUTER.patch('insert_loadrecords', insert_loadRecords);

export default ROUTER;