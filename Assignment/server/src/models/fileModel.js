import mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
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
    mime_type: {
        type: String,
        required: 'Enter a mime type',
    },
    metadata:
        [
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
                file_size: {
                    type: String,
                },
            }

        ],
    locked: {
        type: Boolean,
        default: false,
    },
});
