import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    surname: { type: String, required: true},
    othername: { type: String, required: true},
    middlename: {type: String},
    email: { type: String, required: true},
    password: { type: String, required: true},
    profileImage: String,
    id : {type: String},
    
});

export default mongoose.model('Login', userSchema);;