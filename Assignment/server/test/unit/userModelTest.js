import mongoose from 'mongoose'
import { expect } from 'chai';


const { UserSchema } = require('../../src/models/userModel');
const User = mongoose.model('user', UserSchema);

describe('user', ()=> {
    it('should be invalid if firstName is empty', function(done) {
        var u = new User();
 
        u.validate(function(err) {
            expect(err.errors.firstName).to.exist;
            done();
        });
    });
});

describe('user', ()=> {
    it('should be invalid if lastName is empty', function(done) {
        var u = new User();
 
        u.validate(function(err) {
            expect(err.errors.lastName).to.exist;
            done();
        });
    });
});

describe('user', ()=> {
    it('should be invalid if email is empty', function(done) {
        var u = new User();
 
        u.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});

describe('user', ()=> {
    it('should be invalid if password is empty', function(done) {
        var u = new User();
 
        u.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });
});

describe('user', ()=> {
    it('should be invalid if created_date is empty', function(done) {
        var u = new User();
 
        u.validate(function(err) {
            expect(err.errors.created_date).to.not.exist;
            done();
        });
    });
});