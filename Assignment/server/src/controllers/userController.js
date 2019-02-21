import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const addNewUser = (req, res) => {
    const newUser = new User(req.body);
    // create a new user using the request body
    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

export const getUsers = (req, res) => {
    // get all the users and if no errors return in the reponse
    User.find({}, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

export const getUserWithId = (req, res) => {
    // get the user with the request userId and if no errors
    // return the user details in the response
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

export const updateUser = (req, res) => {
    // update the user with request userId and if no errors store in the database
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
    // delete the user with the request userId
    User.deleteOne({ _id: req.params.userId }, (err) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted user!' });
    });
};
