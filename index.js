const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const io = new Server(server);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('app'));

var tareas = [{
  nombre: 'Diseñador login',
  idcolumna: 'tareas',
  codigo: 'dsa456',
  etiqueta: 'Requerimiento',
  descripcion: '_---'
}];
var en_progreso = [];
var terminado = [];
var validado = [];

var usuarios = [
  {
    nombre: "admin"
  }
];

//endpoints
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/app/index.html'));
});

//endpoints para tareas
app.get('/obtenerTareas', (req, res)=>{
   res.send(tareas);
});

app.post('/agregarTarea', (req, res)=>{
  tareas.push(req.body)
   io.emit("nuevaTarjeta", req.body)
   res.sendStatus(200)
});

app.delete('/eliminarTareas', (req, res)=>{
   
});

app.post('/actualizarTareas', (req, res)=>{
  console.log(req.body)
  let codigoBody = req.body.codigo;
  let indicePos = tareas.findIndex(item=> item.codigo === codigoBody);
  if(indicePos !== -1){
    tareas[indicePos] = req.body;
    io.emit("actualizarTarjeta", req.body)
    res.sendStatus(200)
  }else{
    res.sendStatus(500)
  }
});


//escuchar eventos
io.on('connection', (socket)=>{
  var nuevo_usuario = "";
  socket.on('nombreUsuario', function(usuario){
    nuevo_usuario = usuario+"_"+usuarios.length;
    usuarios.push({
      nombre: nuevo_usuario
    })
    console.log("usuario conectado: " + nuevo_usuario);
  });
})


server.listen(3000, () => {
  console.log('Pizzarra SCRUM corriendo...');
});