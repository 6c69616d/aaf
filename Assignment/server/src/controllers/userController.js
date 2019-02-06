import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const addNewUser = (req, res) => {
    const newUser = new User(req.body);

    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

export const getUsers = (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

export const getUserWithId = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

export const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

export const deleteUser = (req, res) => {
    // changed to deleteOne as remove deprecated
    User.deleteOne({ _id: req.params.userId }, (err) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted user!' });
    });
};