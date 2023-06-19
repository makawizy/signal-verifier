import mongoose from 'mongoose';
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

});

export default mongoose.model('PS', psSchema);