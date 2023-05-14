import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Login from '../models/login.js';
import { createError } from '../util/error.js';

export const register = async (req, res, next) => {
    try {
       const User = await Login.findOne({email: req.body.email});
       const registerEmail = req.body.email;
        console.log(registerEmail);
        if(User) return next(createError(404, `Email already exist : ${registerEmail}`));
        
        try {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            const newUser = new Login({
             email: req.body.email,
             password: hashedPassword,
             surname: req.body.surname ,
             middlename: req.body.middlename,
             othername: req.body.othername,
         });
         await newUser.save();
         const {password, ...otherDetails} = req.body;
         res.status(200).send({...otherDetails});
        } catch (error) {
            next(createError(500, error.message));
        }
        
    } catch (error) {
        next(createError(500, error.message));
    }
};
