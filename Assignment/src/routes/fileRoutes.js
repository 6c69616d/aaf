import {
    addNewFile,
    getFiles,
    getFileWithId,
    getVersionOfFile,
    updateFile,
    deleteFile,
    deleteAllTheFiles,
} from '../controllers/fileController';

export const fileRoutes = (app) => {
    app.route('/files')
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, getFiles)

        .post(addNewFile)

        .delete(deleteAllTheFiles);


    app.route('/files/:fileId')
        // get specific user
        .get(getFileWithId)

        // put request
        .put(updateFile)

        // delete request
        .delete(deleteFile);

    app.route('/files/:fileId/:version_number')
        .get(getVersionOfFile);
};
