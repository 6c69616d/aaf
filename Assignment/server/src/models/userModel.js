import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Enter a first name',
    },
    lastName: {
        type: String,
        required: 'Enter a last name',
    },
    email: {
        type: String,
        required: 'Enter an email',
    },
    mobileNumber: {
        type: String,
    },
    password: {
        type: String,
        required: 'Enter a password',

    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    token: {
        type: String,
    },
});
