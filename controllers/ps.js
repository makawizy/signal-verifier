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
        res.status(200).json({ response : "SUCCESSFUL"});
    } catch (error) {
        next(createError(500, error.message));
    }


};

export const get_ps = async (req, res, next) => {

    try {
        const myPS = await PS.find({ email: req.body.email });
        const loginEmail = req.body.email;
        if (!myPS) return next(createError(404, `Empty List For : ${loginEmail}`));
        console.log(myPS)
        res
            .status(200)
            .json({ myPS });
    } catch (error) {
        next(createError(500, error.message));
    }

};