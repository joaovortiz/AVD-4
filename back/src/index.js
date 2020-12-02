const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');


const server = require('http').Server(app)
const io = require('socket.io')(server);

// Altere o código abaixo para conectar no banco de dado
// do mongodb na nuvem
mongoose.connect(`mongodb+srv://admin:admin@cluster0.c5mus.mongodb.net/Cluster0?retryWrites=true&w=majority`, { 
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
 })

app.use((req, res, next) => {
  req.io = io;
  next();
})

app.use(cors())

app.use(bodyParser());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resizes')))

app.use(require('./routes'))

server.listen(3333, () => {
  console.log('Servidor rodando')
})

