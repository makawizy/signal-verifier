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

export const update_ps = async (req, res, next) => {
    try {
        const {id : _id} = req.params;
        const ps_details = req.body;
        if(!mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({response:"No post with such id"});
        const updatedPS = await PS.findByIdAndUpdate(id, {...ps_details, _id}, {new: true});
        res.json(updatedPS);
    } catch (error) {
        next(createError(500, error.message));
    }
};

export const take_ps = async (req, res, next) => {
    try {
        const rec = [
            { "id_att": "1", "status": false },
            { "id_att": "2", "status": true },
            { "id_att": "3", "status": true },
            { "id_att": "4", "status": false },
            { "id_att": "5", "status": true },
            { "id_att": "6", "status": true },
        ];
        const { id: _id } = req.params;
        res.json(rec);

    } catch (error) {
        next(createError(500, error.message));
    }
};