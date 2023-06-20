import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import PS from '../models/ps.js';
import { createError } from '../util/error.js';

export const create_ps = async (req, res, next) => {

    try {

        const createPS = new PS({
            title: req.body.Title,
            description: req.body.Description,
            createdAt: new Date(req.body.DateCreated),
            email: req.body.email,
        });
        await createPS.save();
        res.status(200).json("SUCCESSFUL");
    } catch (error) {
        next(createError(500, error.message));
    }


};