import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Reports from '../models/report.js';
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
        const { id } = req.params;
        const result = await PS.aggregate([
            {
                $lookup: {
                    from: 'Reports',
                    localField: '_id', // Field in "ps" collection to match
                    foreignField: 'ps_id', // Field in "reports" collection to match
                    as: 'reportData' // New field to store the joined data (you can use any name)
                }
            },
            {
                $unwind: '$reportData' // Unwind the "reportData" array to work with each joined document
            },
            {
                $match: {
                    'reportData.status': false,  // Filter the result where "status" in "reports" is true
                }
            },
            {
                $group: {
                    _id: '$_id', // Group the result by "_id" to restore the original documents
                    // Include any other fields you want to retain from the "ps" collection
                    // For example: fieldName: { $first: '$fieldName' }
                }
            }
        ]);
        res.status(200).json(result);

    } catch (error) {
        next(createError(error.code, error.message));
    }
};
