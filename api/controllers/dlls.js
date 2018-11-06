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
                    get_info: {
                        type: 'GET',
                        description: 'Get information about this DLL',
                        url: `https://twrsquad.pl/api/dlls/${doc._id}`
                    },
                    download_file: {
                        type: 'GET',
                        description: 'Download DLL file using this URL',
                        url: `https://twrsquad.pl/api/uploads/${doc._id}`
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
        if (doc){
            res.status(200).json({
                dll: doc,
                get_info: {
                    type: 'GET',
                    description: 'Get information about this DLL',
                    url: `https://twrsquad.pl/api/dlls/${doc._id}`
                },
                download_file: {
                    type: 'GET',
                    description: 'Download DLL file using this URL',
                    url: `https://twrsquad.pl/api/uploads/${doc._id}`
                }
            });
        } else {
            res.status(404).json({
                message: 'No valid entry was found for a provided ID'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}
//


// POST requests
exports.dlls_add_new = (req, res, next) => {
    const entry = new DLL({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        dllFile: req.file.path
    });

    entry
    .save()
    .then(result => {
        res.status(201).json({
            message: 'DLL successfully uploaded!',
            _id: result._id,
            name: result.name,
            dllFile: result.dllFile,
            get_info: {
                type: 'GET',
                description: 'Get information about this DLL',
                url: `https://twrsquad.pl/api/dlls/${result._id}`
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

// PUT - doesn't work completely
exports.dlls_update_one = (req, res, next) => {
    const id = req.params.dllId
    const name = req.body.name
    const dllFile = req.file.path
    

    DLL
    .findOneAndUpdate(id, { $set: { name, dllFile } })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'File successfully updated!',
            get_info: {
                type: 'GET',
                description: 'Get information about this DLL',
                url: `https://twrsquad.pl/api/dlls/${result._id}`
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

exports.dlls_delete_one = (req, res, next) => {
    const id = req.params.dllId;

    // Remove a DLL file and its entry in the database

    DLL
    .findById(id)
    .exec()
    .then(doc => {
        fs.unlink(doc.dllFile, (err) => {
            if (err) throw err;
            console.log('File successfully deleted!');
        });
    })
    .then(() => DLL.deleteOne({ _id: id }, (err, result) => {
        if (!err) {
            return res.status(200).json({
                message: 'File siccessfully deleted!',
                add_new: {
                    type: 'POST',
                    description: 'Upload a new file using this URL and Schema',
                    url: 'https://twrsquad.pl/api/dlls',
                    body: { name: 'String', dllFile: 'String' }
                }
            });
        } else {
            return res.status(500).json({
                error: err
            });
        }
    }))
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
}