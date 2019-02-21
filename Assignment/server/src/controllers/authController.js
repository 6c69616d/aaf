import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

// login method
export const login = (req, res) => {
    // find a user with the email address in the request body
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            // if it errors send the error
            res.send(err);

        // if email matches one in the database and the password is correct assign the user a token
        } else if (user && user.password === req.body.password) {
            // create token that consists of email current date and time and user first name
            const token = `${user.email}+${Date.now()}+${user.firstName}`;
            const newUser = user;
            newUser.token = token;
            // find the user and store it in the database
            User.findOneAndUpdate({ email: user.email }, new User(newUser), (error) => {
                if (error) {
                    res.send(error);
                } else {
                    res.json({ token });
                }
            });
        } else {
            // send a message of incorrect details entered
            res.send({ error: 'Email or password is not correct' });
        }
    });
};

// logout method
export const logout = (req, res) => {
    // store the user's token in a variable
    const providedToken = req.headers.authorization;

    // find the user with the token
    User.findOne({ token: providedToken }, (err, user) => {
        if (err) {
            res.send(err);
        // if user is not null and the user has the matching stored token
        } else if (user && user.token === providedToken) {
            // delete the token from the user record
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

// isUserAuthenicated method
export const isUserAuthenticated = (req, res, next) => {
    // store the user's token in a variable
    const userToken = req.headers.authorization;
    // if user has a token
    if (userToken) {
        // find the user that has that token
        User.findOne({ token: userToken }, (err) => {
            if (err) {
                res.end();
            } else {
                // allow user to proceed
                next();
            }
        });
    } else {
        res.end();
    }
};
