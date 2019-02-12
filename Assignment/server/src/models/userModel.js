import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
});

UserSchema.pre('save', function (next) {
    const user = this;
    const hash = bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = function (password) {
    const user = this;
    const compare = bcrypt.compare(password, user.password);
    return compare;
};