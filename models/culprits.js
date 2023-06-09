import mongoose from 'mongoose';
const culpritsSchema = mongoose.Schema({
    surname: { type: String, required: true},
    othername: { type: String, required: true},
    middlename: {type: String},
    email: { type: String, required: true},
    profileImage: String,
    army_number: { type: String, required: true },
    offence: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    id : {type: String},
    
});

export default mongoose.model('Culprits', culpritsSchema);