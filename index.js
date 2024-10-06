const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
    fs.readdir(`./files`, function(err,files){
        res.render('index', {files:files});
    })

app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,fileData){
        res.render("show",{filename: req.params.filename, fileData:fileData});
    })
    })

app.get('/edit/:filename', function(req, res){
    res.render("edit",{filename:req.params.filename});
    })

app.post('/edit', function(req, res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`, function(err){
        res.redirect("/");
    })
})
// Deleting files
app.get('/delete/:filename', function(req, res){
    res.render("delete",{filename:req.params.filename});
    })

app.post('/delete', function(req, res){
    fs.unlink(`./files/${req.body.deletefile}`, function(err){
        res.redirect("/");
    })
})

app.post('/create', function(req, res){
     /*using split method to get the text in array form and then use join to make them single text with no spaces*/
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect("/");
    })
})
});
app.listen(3000);