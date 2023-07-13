import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Report from '../models/report.js';
import PS from '../models/ps.js';
import mongoose from 'mongoose';
import { createError } from '../util/error.js';

export const cancel_existing_report = async (req, res, next) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: 'Report', // Replace with the actual collection name
                    localField: 'ps_id',
                    foreignField: '_id',
                    as: 'joinedData1'
                }
            },
            {
                $lookup: {
                    from: 'PS', // Replace with the actual collection name
                    localField: '_id',
                    foreignField: 'ps_id',
                    as: 'joinedData2'
                }
            },
            {
                $project: {
                    combinedData: {
                        $concatArrays: ['$joinedData1', '$joinedData2']
                    }
                }
            }
            // Add more pipeline stages as needed
        ];
        const result = Report.aggregate(pipeline);
        console.log(result);

    } catch (error) {

    }
}