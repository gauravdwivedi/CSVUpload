const files = require('../model/uploadfile');

const csv = require('csvtojson');

const fs = require('fs');

const path = require('path');
const Files = require('../model/uploadfile');



//upload a file to the server

module.exports.uploadFile = async function (req, res) {
    try {

        //if req has file
        if (req.file) {
            let Filename = req.file.originalname;
            filename = path.parse(Filename).name;


            await Files.create({
                name: Filename,
                path: req.file.filename
            });
        }
        return res.render('home', {
            path: 'home',
            title: 'CSV UPLOAD',
            message: 'File Uploaded Successfully'
        });
    } catch (err) {
        return res.render('home', {
            path: "home",
            title: "CSV UPLOAD",
            message: "File upload failed!"
        });
    }
}

//fetch all files 
module.exports.displayAllFiles = async function (req, res) {
    try {
        let allFiles = await Files.find({});

        return res.render('files', {
            title: 'All files',
            path: 'files',
            files: allFiles
        });
    } catch (err) {
        return res.redirect('back');

    }
}


//selected files fetched

module.exports.openFile = async function (req, res) {
    try {
        let file = await Files.findById(req.params.id);

        let csvFilePath = path.join(__dirname, '../', 'uploads/', file.path);

        //csv to json
        const jsonArray = await csv().fromFile(csvFilePath);

        return res.render('display', {
            path: 'Display Files',
            title: 'display',
            name: file.name,
            jsonArray
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}