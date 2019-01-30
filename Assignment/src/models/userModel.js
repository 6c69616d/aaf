import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name',
    },
    lastName: {
        type: String,
        required: 'Enter a first name',
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
});
