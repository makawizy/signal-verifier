import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Culprits from '../models/culprits.js';
import { createError } from '../util/error.js';

export const culprits = async (req, res, next) => {
    try {
       const myCulprits = await Culprits.find({email: req.body.email});
       const loginEmail = req.body.email;
        console.log(loginEmail);
        if(!myCulprits) return next(createError(404, `Empty culprits list : ${loginEmail}`));
        const culpritsDetails = myCulprits._doc;
        console.log("successfully fetched user");
        console.log(myCulprits);
     res
     .status(200)
     .json({culpritsDetails});
    } catch (error) {
        next(createError(500, error.message));
    }
};
