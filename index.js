const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, console.log('servidor iniciado en el puerto ' + port));

const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//mostrar canciones
app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    res.send(canciones);
})

//agregar canciones
app.post('/canciones', (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    canciones.push(cancion);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('cancion agregada correctamente')
})

//eliminar canciones
app.delete('/canciones/:id', (req, res) => {
    const id = req.params.id;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index = canciones.findIndex(ele => ele.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('cancion eliminada correctamente')
})

//editar canciones
app.put('/canciones/:id', (req, res) => {
    const id = req.params.id;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index = canciones.findIndex(ele => ele.id == id);
    canciones[index] = cancion;
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('cancion editada correctamente');
})