const xlsx = require('node-xlsx');
const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload());

app.post('/upload', function(req, res) {
    console.log('in upload');
    console.log(req.files.file); // the uploaded file object
});


app.listen(3000, function () {
    console.log(' in 47.93.61.38 at port 3000')
});