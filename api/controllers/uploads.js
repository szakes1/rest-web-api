const DLL = require('../models/dll');

module.exports = (req, res, next) => {
    const id = req.params.dllId

    DLL
    .findById(id)
    .exec()
    .then(doc => {
        res.download(`./${doc.dllFile}`);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

}