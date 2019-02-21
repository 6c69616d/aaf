import mongoose from 'mongoose';
import { FileSchema } from '../models/fileModel';

const File = mongoose.model('file', FileSchema);

export const addNewFile = (req, res) => {
    // create a new file with the property values sent in the request
    const newFile = new File({
        name_with_file_type: req.body.name_with_file_type,
        original_author: req.body.original_author,
        creation_date: req.body.creation_date,
        mime_type: req.body.mime_type,
        metadata: [{
            title: req.body.title,
            version_number: req.body.version_number,
            version_author: req.body.version_author,
            version_date: req.body.version_date,
            keywords_tags: req.body.keywords_tags,
            file_size: req.body.file_size,
        }],
        locked: req.body.locked,
    });
    // save the file to the database if no errors
    newFile.save((err, file) => {
        if (err) {
            res.send(err);
        }
        res.json(file);
    });
};

export const getFiles = (req, res) => {
    // get all the files and if no errors return in the reponse
    File.find({}, (err, file) => {
        if (err) {
            res.send(err);
        } else {
            console.log(file);
            res.json(file);
        }
    });
};

export const getFileWithId = (req, res) => {
    // get  the file with the request fileId and if no errors
    // return the file details in the response
    File.findById(req.params.fileId, (err, file) => {
        if (err) {
            res.send(err);
        } else {
            res.json(file);
        }
    });
};

export const updateFile = (req, res) => {
    // update the file with request fileId and if no errors store in the database
    File.findById(req.params.fileId, (err, file) => {
        if (err) {
            res.send(err);
        } else {
            const fileToUpdate = file;
            fileToUpdate.locked = req.body.locked;
            fileToUpdate.metadata[file.metadata.length] = {
                title: req.body.title,
                version_number: req.body.version_number,
                version_author: req.body.version_author,
                version_date: req.body.version_date,
                keywords_tags: req.body.keywords_tags,
                file_size: req.body.file_size,
            };
            File.findOneAndUpdate({ _id: req.params.fileId }, new File(fileToUpdate), { new: true },
                (err2, updatedFile) => {
                    if (err2) {
                        res.send(err2);
                    } else {
                        res.json(updatedFile);
                    }
                });
        }
    });
};

export const lockFile = (req, res) => {
    // set the locked property of the request fileId to true
    File.findById(req.params.fileId, (err, file) => {
        if (err) {
            res.send(err);
        } else {
            const fileToUpdate = file;
            fileToUpdate.locked = true;
            File.findOneAndUpdate({ _id: req.params.fileId }, new File(fileToUpdate), { new: true },
                (err2, updatedFile) => {
                    if (err2) {
                        res.send(err2);
                    } else {
                        res.json(updatedFile);
                    }
                });
        }
    });
};


export const deleteFile = (req, res) => {
    // changed to deleteOne as remove deprecated
    // delete the file with the request fileId
    File.deleteOne({ _id: req.params.fileId }, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Successfully deleted file!' });
        }
    });
};

export const deleteAllTheFiles = (req, res) => {
    // delete all the files from the database
    File.deleteMany({}, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: 'Successfully deleted all the files!' });
        }
    });
};
