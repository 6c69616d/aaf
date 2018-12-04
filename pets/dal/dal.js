// database connection configuration
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'database';
const client = new MongoClient(url);

module.exports = {

    getAllPets: function (req, res, next) {
        client.connect(function (err) {
            const db = client.db(dbName);
            const collection = db.collection('animals');

            collection.find({}).toArray(function (err, data) {
                if (err != null) {
                    console.log(err);
                    next(false, err, []);
                }
                next(true, [], data);
            });
        });
    },

    getPetById: function (req, res, next) {
        client.connect(function (err) {
            const db = client.db(dbName);
            const collection = db.collection('animals');

            collection.find({ _id: ObjectId(req.params.id) }).toArray(function (err, data) {
                if (err != null) {
                    console.log(err);
                    next(false, err, []);
                }
                next(true, [], data);
            });
        });
    },

    addNewPet: function (nu, req, res, next) {
        client.connect(function (err) {
            const db = client.db(dbName);
            const collection = db.collection('animals');

            collection.insertOne(nu, function (err, result) {
                if (err != null) {
                    console.log(err);
                    console.log(err);
                    next(false, err, []);
                }
                next(true, [], data);
            });
        });
    },

    updatePetById: function (nu, req, res, next) {
        client.connect(function (err) {
            const db = client.db(dbName);
            const collection = db.collection('animals');

            collection.updateOne(
                { _id: ObjectId(nu.id) },
                { $set: { name: nu.name, breed: nu.breed, species: nu.species, age: nu.age, colour: nu.colour } },
                function (err, result) {
                    if (err != null) {
                        console.log(err);
                        next(false, err, []);
                    }
                    next(true, [], data);
                });
        });
    },

    deleteById: function (req, res, next) {
        client.connect(function (err) {
            const db = client.db(dbName);
            const collection = db.collection('animals');

            collection.deleteOne({ _id: ObjectId(req.params.id) }, function (err, result) {
                if (err != null) {
                    console.log(err);
                    next(false, err, []);
                }
                next(true, [], data);
            });
        });
    }

}