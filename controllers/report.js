import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Report from '../models/report.js';
import mongoose from 'mongoose';
import { createError } from '../util/error.js';

export const cancel_existing_report = async (req, res, next) => {
    try {
        const id = req.params;
        const can = await Report.updateMany({ ps_id: id }, { $set: { status: true } });
        res.status(200).send("success");
    } catch (error) {
        next(createError(error.code, error.message));
    }
}