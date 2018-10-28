const mongoose = require('mongoose');
const DLL = require('../models/dll');

exports.dlls_get_all = (req, res, next) => {
    DLL
    .find()
    .exec()
    .then(docs => {
        const response = {
            number_of_dlls: docs.length,
            dlls: docs.map(doc => {
                return {
                    name: doc.name,
                    dllFile: doc.dllFile,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/api/dlls/${doc._id}`
                    }
                }
            })
        };

        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
    );
}

// exports.dlls_get_one = async (req, res, next) => {}

exports.dlls_add_new = (req, res, next) => {
    const entry = new DLL({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        dllFile: req.file.path
    });

    entry
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'DLL successfully uploaded!',
            _id: result._id,
            name: result.name,
            request: {
                type: 'GET',
                url: `http://localhost:3000/api/dlls/${result._id}`
            }

        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}