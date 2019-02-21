import {
    addNewUser,
    getUsers,
    getUserWithId,
    updateUser,
    deleteUser,
} from '../controllers/userController';
import {
    isUserAuthenticated,
} from '../controllers/authController';

export const userRoutes = (app) => {
    // make sure user is authenticated to access these routes
    app.use(isUserAuthenticated);
    // route for actions on all the users
    app.route('/users')
        // http get using the getUsers method
        .get(getUsers)

        // http post using the addNewUser method
        .post(addNewUser)

        // http delete all the users
        .delete((req, res) => res.send('DELETE request successful'));

    // route for actions on a specific user
    app.route('/users/:userId')
        // http get using the getUserWithId method
        .get(getUserWithId)

        // http put using updateUser method
        .put(updateUser)

        // http delete using deleteUser method
        .delete(deleteUser);
};
