import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user && user.password === req.body.password) {
            const token = `${user.email}+${Date.now()}+${user.firstName}`;
            const newUser = user;
            newUser.token = token;
            User.findOneAndUpdate({ email: user.email }, new User(newUser), (error) => {
                if (error) {
                    res.send(error);
                } else {
                    res.json({ token });
                }
            });
        } else {
            res.send({ error: 'Username or password is not correct' });
        }
    });
};

export const logout = (req, res) => {
    const providedToken = req.headers.authorization;

    User.findOne({ token: providedToken }, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user && user.token === providedToken) {
            User.findByIdAndUpdate({ email: user.email },
                { $unset: { token: providedToken } }, (error) => {
                    if (error) {
                        res.send(error);
                    } else {
                        res.json({
                            msg: 'Please remove your token',
                        });
                    }
                });
        } else {
            res.end();
        }
    });
};

export const isUserAuthenticated = (req, res, next) => {
    const userToken = req.headers.authorization;
    if (userToken) {
        User.findOne({ token: userToken }, (err) => {
            if (err) {
                res.end();
            } else {
                next();
            }
        });
    } else {
        res.end();
    }
};
