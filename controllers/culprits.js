import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Culprits from '../models/culprits.js';
import { createError } from '../util/error.js';

export const culprits = async (req, res, next) => {
    try {
       const myCulprits = await Culprits.find({email: req.body.email});
       const loginEmail = req.body.email;
        if(!myCulprits) return next(createError(404, `Empty culprits list : ${loginEmail}`));
        console.log(myCulprits)
        res
     .status(200)
            .json({ myCulprits });

    } catch (error) {
        console.log(error.message)
        next(createError(500, error.message));
    }
};


export const add_culprits = async (req, res, next) => {

        

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
        res.status(200).json({ response: "SUCCESSFUL" });
        } catch (error) {
            next(createError(500, error.message));
        }

   
};
