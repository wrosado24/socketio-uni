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

app.get('/obtenerTarjetas', (req, res)=>{
  const opcion = req.query.valor
  if(opcion == "tareas"){
    res.send(tareas);
  }else if(opcion == "progresos"){
    res.send(en_progreso);
  }else if(opcion == "terminados"){
    res.send(terminado);
  }else if(opcion == "validados"){
    res.send(validado);
  }
});

app.post('/agregarTarjeta', (req, res)=>{

  const opcion = req.query.valor
  if(opcion == "tareas"){
    tareas.push(req.body)
  }else if(opcion == "progreso"){
    en_progreso.push(req.body)
  }else if(opcion == "terminado"){
    terminado.push(req.body)
  }else if(opcion == "validado"){
    validado.push(req.body)
  }
   io.emit("nuevaTarjeta", req.body)
   res.sendStatus(200)
});

app.delete('/eliminarTareas', (req, res)=>{
   
});

app.post('/actualizarTarjeta', (req, res)=>{

  const opcion = req.query.valor
  let codigoBody = req.body.codigo;

  if(opcion == "tareas"){
    let indicePos = tareas.findIndex(item=> item.codigo === codigoBody);
    if(indicePos !== -1){
      tareas[indicePos] = req.body;
      io.emit("actualizarTarjeta", req.body)
      res.sendStatus(200)
    }else{
      res.sendStatus(500)
    }
  }else if(opcion == "progreso"){
    let indicePos = en_progreso.findIndex(item=> item.codigo === codigoBody);
    if(indicePos !== -1){
      en_progreso[indicePos] = req.body;
      io.emit("actualizarTarjeta", req.body)
      res.sendStatus(200)
    }else{
      res.sendStatus(500)
    }
  }else if(opcion == "terminado"){
    let indicePos = terminado.findIndex(item=> item.codigo === codigoBody);
    if(indicePos !== -1){
      terminado[indicePos] = req.body;
      io.emit("actualizarTarjeta", req.body)
      res.sendStatus(200)
    }else{
      res.sendStatus(500)
    }
  }else if(opcion == "validado"){
    let indicePos = validado.findIndex(item=> item.codigo === codigoBody);
    if(indicePos !== -1){
      validado[indicePos] = req.body;
      io.emit("actualizarTarjeta", req.body)
      res.sendStatus(200)
    }else{
      res.sendStatus(500)
    }
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