var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require('path');
var final = require('./final.js');


onHttpStart = () => {
    console.log('Express http server listening on port ' + HTTP_PORT);
    
  }
    
   
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname +"/finalViews/home.html"));
    });


    app.get('/register', (req, res) => {
        res.sendFile(path.join(__dirname + "/finalViews/register.html"));
    });
    
    app.post('/register', (req, res) => {
        final.register(req.body).then(() =>{
            res.send("<p>registered"
    +"<p><a href='/'>Go Home</a></p>")
         
           }).catch(err =>
        res.send({err}))
          })
  
    app.get('/signIn', (req, res) => {
        res.sendFile(path.join(__dirname + "/finalViews/signIn.html"));
    });

    app.post('/signIn', (req, res) => {
        final.signIn(req.body).then(() =>{
            res.send("<p>Sign in"
    +"<p><a href='/'>Go Home</a></p>")
         
           }).catch(err =>
        res.send({err}))
          })
    
    app.use((req, res) => {
        res.status(404).end('404 PAGE NOT FOUND');
    });
    final.startDB().then(function () {
        app.listen(HTTP_PORT, onHttpStart());
           })
       
    
       .catch(function (err) {
         console.log('Failed to start!' + err);
       });

       app.listen(HTTP_PORT, onHttpStart());


