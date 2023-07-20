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
            // Find the "ps" document with the specified ID
            const psDocument = await PS.findOne({ _id: new mongoose.Types.ObjectId(id) });

            if (!psDocument) {
                return res.status(404).json({ error: 'Parade State not found' });
            }

            // Find the "reports" documents with ps_id equal to the specified ID and status set to false
            const reportData = await Reports.find({ ps_id: id, status: false }, { _id: 0, ps_id: 0 });

            // Add the "reportData" array to the "ps" document
            //psDocument.reportData = reportData;
        if (!reportData) {
            return res.status(404).json({ error: 'No Report Created' });
        }
        res.status(200).json(reportData);
        //res.status(200).json(psDocument.records);

    } catch (error) {
        next(createError(error.code, error.message));
    }
};
