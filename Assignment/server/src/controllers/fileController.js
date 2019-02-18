import mongoose from 'mongoose';
import { FileSchema } from '../models/fileModel';

const File = mongoose.model('file', FileSchema);

export const addNewFile = (req, res) => {
    const newFile = new File({
        nameWithFileType: req.body.nameWithFileType,
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

    newFile.save((err, file) => {
        if (err) {
            res.send(err);
        }
        res.json(file);
    });
};

export const getFiles = (req, res) => {
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
    File.findById(req.params.fileId, (err, file) => {
        if (err) {
            res.send(err);
        } else {
            res.json(file);
        }
    });
};

export const getVersionOfFile = (req, res) => {
    File.findById(req.params.fileId, (err, file) => {
        if (err) {
            res.send(err);
        } else {
            const versionNumber = req.params.version_number - 1;
            res.json({
                _id: file._id,
                name: file.name,
                title: file.data[versionNumber].title,
                version_number: file.data[versionNumber].version_number,
                version_author: file.data[versionNumber].author,
                version_date: file.data[versionNumber].created_date,
                keywords_tags: file.data[versionNumber].keywords_tags,
                file_size: req.body.file_size,
            });
        }
    });
};

export const updateFile = (req, res) => {
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

export const deleteFile = (req, res) => {
    // changed to deleteOne as remove deprecated
    File.deleteOne({ _id: req.params.fileId }, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Successfully deleted file!' });
        }
    });
};

export const deleteAllTheFiles = (req, res) => {
    File.deleteMany({}, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: 'Successfully deleted all the files!' });
        }
    });
};
