const express = require('express');
const bodyParser = require('body-parser'); // Notez le changement ici
const sequelize = require('./config/database');
const User = require('./model/User');

const app = express();

// Utilisation de app.use au lieu de app.user
app.use(bodyParser.json()); // Utilisation de bodyParser.json() au lieu de bodyparser.json()
app.use(bodyParser.urlencoded({extended: false})); // Utilisation de bodyParser.urlencoded() au lieu de bodyparser.urlencoded()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Correction de 'Access-Control-Allow-Origin'
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Correction de 'Access-Control-Allow-Methods'
    next();
});

// Test route
app.get('/', (req, res, next) => {
    res.send('Hello World');
});

app.use('/users', require('./routes/users'));
app.use('/apartments', require('./routes/apartments'));

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
