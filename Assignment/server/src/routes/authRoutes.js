import {
    login,
    logout,
} from '../controllers/authController';

const authRoutes = (app) => {
    // route for login
    app.route('/login')
        // http post using login method
        .post(login);
    // route for logout
    app.route('/logout')
        // http post using logout method
        .post(logout);
};

export default authRoutes;
