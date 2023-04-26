import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Login from '../models/login.js';
import { createError } from '../util/error.js';

export const signIn = async (req, res, next) => {
    try {
       const user = await Login.findOne({email: req.body.email});
        if(!user) return next(createError(404,"USER NOT FOUND!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400,"Wrong Login Incredentials!"))
        const token = jwt.sign({id: user._id},process.env.JWT);
        const {password, ...otherDetails} = user._doc;
     res
     .cookie("access_token", token, {httpOnly:true})
     .status(200)
     .json({...otherDetails});
    } catch (error) {
        next(createError(500, error.message));
    }
};