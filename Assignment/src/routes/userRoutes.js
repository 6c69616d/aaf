import {
    addNewUser,
    getUsers,
    getUserWithId,
    updateUser,
    deleteUser,
} from '../controllers/userController';

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
};
