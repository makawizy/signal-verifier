import express from 'express';
import { cancel_existing_report, create_report } from '../controllers/report.js';

const ROUTER = express.Router();

ROUTER.patch('/cancel/:id', cancel_existing_report);
ROUTER.patch('/create/:id', create_report);

export default ROUTER;