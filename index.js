const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, console.log('servidor iniciado en el puerto '+ port));

const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

