const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static('app'));

var tareas = [{
  iddiv: 'divTareas',
  nombre: 'Diseñador login',
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

app.post('/agregarTareas', (req, res)=>{
   
});

app.delete('/eliminarTareas', (req, res)=>{
   
});

app.put('/actualizarTareas', (req, res)=>{
   
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