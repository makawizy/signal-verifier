import express from 'express';
import { culprits, add_culprits} from '../controllers/culprits.js';

const ROUTER = express.Router();

ROUTER.post('/', culprits);
ROUTER.post('/add_culprits', add_culprits);

export default ROUTER;
