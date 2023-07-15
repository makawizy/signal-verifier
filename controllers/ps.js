import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import PS from '../models/ps.js';
import mongoose from 'mongoose';
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
        next(createError(error.status, error.message));
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
        const id = req.params.id;
        const _id = id;
        const ps_details = req.body;
        if(!mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({response:"No post with such id"});
        const updatedPS = await PS.findByIdAndUpdate(id, {...ps_details, _id}, {new: true});
        console.log(updatedPS)
        res.status(200).json({updatedPS });
    } catch (error) {
        next(createError(error.code, error.message));
    }
};

export const take_ps = async (req, res, next) => {
    try {
        
        const { id: _id } = req.params;
        const insertPS = req.body;
        const result = await PS.updateOne(
            { _id }, // Replace with the appropriate document identifier
            { $set: { take_ps: insertPS } } // Replace 'arrayField' with the name of your array field
        );
        res.status(200).json(result);

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const insert_loadRecords = async (req, res, next) => {
    try {


        const { id: _id } = req.params;
        const records = req.body;

        const ps = await PS.findById({ _id });
        const holdrecord = ps.records;

        const filteredRecords = records.filter(newRecord => {
            return !holdrecord.some(existingRecord => existingRecord.army_number === newRecord.army_number);
        });
        // console.log(filteredRecords)

        const loadRecords = await PS.updateOne({ _id },

            { $push: { records: filteredRecords } },
        );
        res.status(200).json(loadRecords)


    } catch (error) {
        next(createError(error.status, error.message));
    }
};

export const insert_single_record = async (req, res, next) => {
    try {


        const { id: _id } = req.params;
        const record = req.body;

        const ps = await PS.findById({ _id });
        const holdrecords = ps.records;
        const exists = holdrecords.some(records => records.army_number === record.army_number);
        if (!exists) {
            const singleRecords = await PS.updateOne({ _id },

                { $push: { records: record } },
            );
            res.status(200).json({ response: "Added" });
        } else {
            res.status(200).json({ response: "ALready Exist" });
        }

    } catch (error) {
        next(createError(error.status, error.message));
    }
};

export const view_ps_record = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const records = await PS.findById({ _id });
        if (records) {
            res.status(200).json(records.records);
        } else {
            res.status(200).json({ });
        }
        console.log(records)
    } catch (error) {
        next(createError(error.status, error.message));
    }
}



