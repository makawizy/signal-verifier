import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Login from '../models/login.js';
import { createError } from '../util/error.js';

export const profile = async (req, res, next) => {
    try {
       const user = await Login.findOne({email: req.body.email});
       const loginEmail = req.body.email;
        console.log(loginEmail);
        if(!user) return next(createError(404, `CANNOT FIND USER : ${loginEmail}`));
        const {password, ...otherDetails} = user._doc;
        console.log("successfully fetched user");
        console.log(otherDetails);
     res
     .status(200)
     .json({...otherDetails});
    } catch (error) {
        next(createError(500, error.message));
    }
};
