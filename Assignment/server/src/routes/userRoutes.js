import {
    addNewUser,
    getUsers,
    getUserWithId,
    updateUser,
    deleteUser,
} from '../controllers/userController';
import jwt from 'jsonwebtoken';

export const userRoutes = (app) => {
    app.route('/users')
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, getUsers)


        .post(addNewUser)

        .delete((req, res) => res.send('DELETE request successful'));


    app.route('/users/:userId')
        // get specific user
        .get(getUserWithId)

        // put request
        .put(updateUser)

        // delete request
        .delete(deleteUser);
    
    app.route('/login', async(res, req, next) => {
        passport.authenicate('login', async(err, user, info) => {
            try{
                if(err || !user){
                    const error = new Error('An Error Occured')
                    return next(error);
                }
                req.login(user, {session: false}, async (error) => {
                    if(error) return next(error)
                    const body = {_id : user._id, email : user.user.email };
                    const token = jwt.sign({user : body}, 'top_secret');
                    return res.json({ token });
                }); } catch (error) {
                    return next(error);
                }
            })(req, res, next);
    });
};
