import mongoose from 'mongoose';

const report = mongoose.Schema({
    id: { type: String },
    army_number: { type: String, required: true },
    status: { type: Boolean, default: false },
    date: {
        type: Date,
        default: new Date()
    },

});
const reportSchema = mongoose.Schema({
    id: { type: String },
    ps_id: { type: Object, required: true },
    venue: { type: String, required: true },
    reports: { type: [report], default: [] },
    status: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: new Date()
    },
  
});

export default mongoose.model('ReportSchema', reportSchema);