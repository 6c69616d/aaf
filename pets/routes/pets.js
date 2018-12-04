var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();

var dal = require('../dal/dal');

router.get('/pet', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    dal.getAllPets(req, res, function(stat, err, data) {
    if(err){
        return res.json({ success:false, error:err });
    }
    else{
        return res.json({ success:true, data:data });
    }
    });
});

router.get('/pet/:id', function(req, res, next) {
    dal.getPetById(req, res, function(stat, err, data) {
        if(err){
            return res.json({ success:false, error:err });
        }
        else{
            return res.json({ success:true, data:data });
        }
    });
});

router.post('/pet', upload.array(), function (req, res) {
    let nu = { 
            name: req.body.nom, 
            species: req.body.species, 
            breed: req.body.breed, 
            age: req.body.age, 
            colour: req.body.colour };
    dal.addNewPet(nu, req, res, function(stat, err, data) {
        //return res.json({ status:stat, data:data, error:err });
        if(!err){
            return res.json({ success:true });
        }
        else{
            return res.json({ success:false, error:err });
        }
    });
});

router.put('/pet', upload.array(), function(req, res) {
    let nu = { 
        id: req.body.id,
        name: req.body.nom, 
        species: req.body.species, 
        breed: req.body.breed, 
        age: req.body.age, 
        colour: req.body.colour};
    dal.updatePetById(nu, req, res, function(stat, err, data) {
        return res.json({ status:stat, data:data, error:err });
    });
});

router.delete('/pet/:id', function(req, res) {
    dal.deleteById(req, res, function(stat, err, data) {
        return res.json({ status:stat, data:data, error:err });
    });
});


module.exports = router;
