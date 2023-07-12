import mongoose from 'mongoose';
const take_ps = mongoose.Schema({
    id: { type: String },
    ps_user_id: { type: String },
    time: { type: Date },
    date: { type: Date },
    status: { type: Boolean },
});
const records = mongoose.Schema({
    army_number: { type: String, required: true },
    rank: { type: String, required: true },
    surname: { type: String, required: true },
    othername: { type: String, required: true },
});
const psSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: Boolean, default: false }
    , createdAt: {
        type: Date,
        default: new Date()
    },
    id: { type: String },
    take_ps: [take_ps],
    records : [records],

});

export default mongoose.model('PS', psSchema);