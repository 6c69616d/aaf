import {
    login,
    logout,
} from '../controllers/authController';

const authRoutes = (app) => {
    app.route('/login')
        .post(login);
    app.route('/logout')
        .post(logout);
};

export default authRoutes;
