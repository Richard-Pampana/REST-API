const express = require('express')
const pool = require('./config/database')
const port = 3000

const app = express()

app.get('/', (req, res) => {
    res.sendStatus(200)
})


app.listen(port, () => console.log(`Server a démarrer sur le port: ${port}`))