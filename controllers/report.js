import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Report from '../models/report.js';
import PS from '../models/ps.js';
import mongoose from 'mongoose';
import { createError } from '../util/error.js';

export const cancel_existing_report = async (req, res, next) => {
    try {
        const { id: ps_id } = req.params;
        const can = await Report.updateMany({ ps_id }, { $set: { status: true } });
        res.status(200).send("success");
    } catch (error) {
        next(createError(error.code, error.message));
    }
};

export const create_report = async (req, res, next) => {
    try {
        
        const today = new Date();
        const id = req.params.id;
        const createReport = new Report({
            venue: req.body.venue,
            ps_id : id,
            createdAt: today,
        });
        await createReport.save();
        res.status(200).json(createReport);
    } catch (error) {
        next(createError(error.code, error.message));
    }
};

export const take_report = async (req, res, next) => {
    try {

        const { id: ps_id } = req.params;
        const updateReport = req.body;
        const result = await Report.updateOne(
            { ps_id, status: false,}, // Replace with the appropriate document identifier
            { $set: { reports: updateReport, status : true, } } // Replace 'arrayField' with the name of your array field
        );
        res.status(200).json(result);

    } catch (error) {
        next(createError(error.code, error.message));
    }
};

export const getRecords = async (req, res, next) => {
    try {
        const recordsFilter = { status: { $eq: false } }; // Add filter condition for Product price

        const result = await PS.aggregate([
            {
                $lookup: {
                    from: 'Report', // The collection name to join with (case-sensitive)
                    let: { ps_id: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$ps_id', '$$ps_id'] }, // Match Product _id with Order productId
                                        recordsFilter, // Apply the Product filter condition for price
                                    ],
                                },
                            },
                        },
                    ],
                    as: 'records',
                },
            },
            { $unwind: { path: '$records', preserveNullAndEmptyArrays: true } },

            
        ]);
        res.status(200).json(result);

    } catch (error) {
        next(createError(error.code, error.message));
    }
};
