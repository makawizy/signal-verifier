import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Culprits from '../models/culprits.js';
import { createError } from '../util/error.js';

export const culprits = async (req, res, next) => {
    try {
       const myCulprits = await Culprits.find({email: req.body.email});
       const loginEmail = req.body.email;
        if(!myCulprits) return next(createError(404, `Empty culprits list : ${loginEmail}`));
     res
     .status(200)
     .json({myCulprits});
    } catch (error) {
        next(createError(500, error.message));
    }
};


export const add_culprits = async (req, res, next) => {
    try {
        
        const registerEmail = req.body.email;
        console.log(registerEmail);
        if (User) return next(createError(404, `Email already exist : ${registerEmail}`));

        try {

            const addCulprits = new Culprits({
                army_number: req.body.culpritArmyNumber,
                surname: req.body.culpritSurname,
                othername: req.body.culpritOthername,
                middlename: req.body.culpritMiddlename,
                profileImage: req.body.culpritImage,
                offence: req.body.culpritOffence,
                createdAt: new Date(req.body.selectedDate),
                email: req.body.email,

            });
            await addCulprits.save();
            
            res.status(200).send("SUCCESSFUL");
        } catch (error) {
            next(createError(500, error.message));
        }

    } catch (error) {
        next(createError(500, error.message));
    }
};
