const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({

    path: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


const Files = mongoose.model('Files', fileSchema);

module.exports = Files;