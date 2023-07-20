import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Reports from '../models/report.js';
import PS from '../models/ps.js';
import mongoose from 'mongoose';
import { createError } from '../util/error.js';

export const cancel_existing_report = async (req, res, next) => {
    try {
        const { id: ps_id } = req.params;
        const can = await Reports.updateMany({ ps_id }, { $set: { status: true } });
        res.status(200).send("success");
    } catch (error) {
        next(createError(error.code, error.message));
    }
};

export const create_report = async (req, res, next) => {
    try {
        
        const today = new Date();
        const id = req.params.id;
        const createReport = new Reports({
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
        const result = await Reports.updateOne(
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
        const { id } = req.params;
        const result = await PS.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(id) // Match documents in "ps" collection where "_id" is equal to the specified id
                }
            },
            {
                $lookup: {
                    from: 'reports',
                    let: { psId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: [
                                                { $convert: { input: '$ps_id', to: 'objectId' } },
                                                '$$psId'
                                            ]
                                        }, // Match "ps_id" in "reports" with "psId" from the outer collection
                                        { status: false } // Filter documents where "status" in "reports" is false
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'reportData' // New field to store the joined data (you can use any name)
                }
            }
        ]);

           
        console.log(result.title);

        res.status(200).json(result);

    } catch (error) {
        next(createError(error.code, error.message));
    }
};
