
import express from 'express';
import { create_ps, get_ps, update_ps, take_ps, insert_loadRecords, insert_single_record, view_ps_record } from '../controllers/ps.js';

const ROUTER = express.Router();

ROUTER.post('/create_ps', create_ps);
ROUTER.post('/get_ps', get_ps);
ROUTER.patch('/update_ps/:id', update_ps);
ROUTER.patch('/take_ps/:id', take_ps);
ROUTER.patch('/insert_loadrecords/:id', insert_loadRecords);
ROUTER.post('/insert_single_record/:id', insert_single_record);
ROUTER.get('/view_ps_record/:id', view_ps_record);

export default ROUTER;