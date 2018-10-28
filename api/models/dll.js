const mongoose = require('mongoose');

const dllSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: 'Sorry, but the name is required!' },
    dllFile: { type: String, required: 'You must upload a file!'}
});

module.exports = mongoose.model('DLL', dllSchema);