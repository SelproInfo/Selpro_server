const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/routes.js');
const multer = require('multer');
const { requiresAuth } = require('express-openid-connect');

require('./db.js');

const server = express();

server.name = 'API';

//'https://deploy--musical-dasik-e833c0.netlify.app'

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://selpro-soluciones.netlify.app'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// ! Configura el almacenamiento de multer para manejar múltiples archivos que vengan del fornt
const storage = multer.memoryStorage(); // Almacenamiento en memoria, puedes usar el que prefieras
const upload = multer({ storage: storage });
server.use('/create/user', upload.any())

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

