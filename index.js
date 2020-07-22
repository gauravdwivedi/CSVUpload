const express = require('express');
const db = require('./config/mongoose');
const expressLayout = require("express-ejs-layouts");
const port = 8000;
const path = require('path');

//express application
const app = express();


//middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//assets path
app.use(express.static('./assets'));

app.use('/uploads', express.static(__dirname + "/uploads"));

//set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//use express layouts
app.use(expressLayout);

//routes redirect
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});