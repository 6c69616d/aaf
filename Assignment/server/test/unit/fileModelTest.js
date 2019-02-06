import mongoose from 'mongoose'
import { expect } from 'chai';

const { FileSchema } = require('../../src/models/fileModel');
const File = mongoose.model('file', FileSchema);

describe('file', ()=> {
    it('should be invalid if nameWithFileType is empty', function(done) {
        var f = new File();
 
        f.validate(function(err) {
            expect(err.errors.nameWithFileType).to.exist;
            done();
        });
    });
});

describe('file', ()=> {
    it('should be invalid if creation_date is empty', function(done) {
        var f = new File();
 
        f.validate(function(err) {
            expect(err.errors.creation_date).to.exist;
            done();
        });
    });
});

describe('file', ()=> {
    it('should be invalid if mime_type is empty', function(done) {
        var f = new File();
 
        f.validate(function(err) {
            expect(err.errors.mime_type).to.exist;
            done();
        });
    });
});
