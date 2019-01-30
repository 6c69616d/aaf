import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FileSchema = new Schema({
    nameWithFileType: {
        type: String,
        required: 'Enter a file name and extension',
    },
    original_author: {
        type: String,
    },
    creation_date: {
        type: Date,
        required: 'Enter a creation date',
    },
    metadata: [
        {
            title: {
                type: String,
                required: 'Enter a title',
            },
            version_number: {
                type: Number,
                default: 1,
            },
            version_author: { // could change to logged in user some how
                type: String,
                required: 'Enter an author',
            },
            version_date: {
                type: Date,
                default: Date.now,
            },
            keywords_tags: {
                type: Array,
            },
        },
    ],
    locked: {
        type: Boolean,
        default: false,
    },
});
