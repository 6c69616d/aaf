import {
    addNewFile,
    getFiles,
    getFileWithId,
    lockFile,
    updateFile,
    deleteFile,
    deleteAllTheFiles,
} from '../controllers/fileController';
import {
    isUserAuthenticated,
} from '../controllers/authController';

export const fileRoutes = (app) => {
    // make sure user is authenticated to access these routes
    app.use(isUserAuthenticated);
    // route for actions on all the files
    app.route('/files')

        // http get using the getFiles method
        .get(getFiles)

        // http post using the addNewFile method
        .post(addNewFile)

        // http delete using the deleteAllTheFile method
        .delete(deleteAllTheFiles);

    // route for actions on a specific file
    app.route('/files/:fileId')
        // http get using the getFileWithId method
        .get(getFileWithId)

        // http put using updateFile method
        .put(updateFile)

        // http delete using deleteFile method
        .delete(deleteFile);

    // route to lock a specific file
    app.route('/files/:fileId/lock')
        // http put using lockFile method
        .put(lockFile);
};
