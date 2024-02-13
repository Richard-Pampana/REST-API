const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('../config/database');
const User = require('../model/User');


const app = express();

app.user(bodyparser.json());
app.user(bodyparser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access control origin', '*');
    res.setHeader('Access control methods', 'GET, POST, PUT, DELETE');
    next();
});

//test route
app.get('/', (req, res, next) => {
    res.send('Hello World');
});


app.use('/users', require('./routes/users'));

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message});
});

sequelize
    .sync()
    .then(result => {
        console.log("BDD connecté");
        app.listen(3000);
    })
    .catch(err => console.log(err));