const mongoose = require('mongoose');
const DLL = require('../models/dll');
const fs = require('fs');


// GET requests
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

exports.dlls_get_one = (req, res, next) => {
    const id = req.params.dllId
    DLL
    .findById(id)
    .select('name _id dllFile')
    .exec()
    .then(doc => {
        console.log('From database: ', doc);
        if (doc){
            res.status(200).json({
                dll: doc,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/api/dlls/${doc._id}`
                }
            });
        } else {
            res.status(404).json({
                message: 'No valid entry was found for a provided ID'
            });
        }
    })
}
//


// POST requests
exports.dlls_add_new = (req, res, next) => {
    const entry = new DLL({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        dllFile: `uploads/${req.file.originalname}`
    });

    entry
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'DLL successfully uploaded!',
            _id: result._id,
            name: result.name,
            dllFile: result.dllFile,
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

// PUT
exports.dlls_update_one = (req, res, next) => {
    const id = req.params.dllId
    const name = req.body.name
    const dllFile = `uploads/${req.file.originalname}`
    

    DLL
    .findOneAndUpdate(id, { $set: { name, dllFile } })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'File successfully updated!',
            request: {
                type: 'GET',
                url: `http://localhost:3000/api/dlls/${result._id}`
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}


// DELETE requests

exports.dlls_delete_one = async (req, res, next) => {
    const id = req.params.dllId;

    // Remove DLL file from a storage

    await DLL.findById(id, (err, doc) => {
        if (!err) {
            fs.unlink(doc.dllFile, (err) => {
                if (!err) {
                    console.log("File successfully deleted!");
                } else {
                    res.status(500).json({
                        error: err
                    });
                }
            });
        } else {
            res.status(500).json({
                error: err
            });
        }
    });

    // Remove entry for the database

    await DLL.deleteOne({ _id: id }, (err, result) => {
        if (!err) {
            res.status(200).json({
                message: 'DLL successfully deleted!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/api/dlls',
                    body: { name: 'String', dllFile: 'String' }
                }
            });
        } else {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    });
    
}