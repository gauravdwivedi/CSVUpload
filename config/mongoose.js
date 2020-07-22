const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/csvupload');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function () {
    console.log("COnnected to Database :: MongoDB");
});

module.exports = db;