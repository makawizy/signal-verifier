import express from 'express';
import { cancel_existing_report, create_report, take_report, getRecords } from '../controllers/report.js';

const ROUTER = express.Router();

ROUTER.patch('/cancel/:id', cancel_existing_report);
ROUTER.post('/create/:id', create_report);
ROUTER.patch('/take_report/:id', take_report);
ROUTER.get('/get_records/:id', getRecords);

export default ROUTER;