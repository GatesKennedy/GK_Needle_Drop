const http = require('http');
const express = require('express');

//  Client host/port
const hostname = '127.0.0.1';
const port = 3000;

//  Initialize express Variable
const nds = express();
//  Connect Db

//  Init Middleware
nds.use(
  express.json({
    extended: false
  })
);

//  Define Routes
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Needle Drop\n');
});

server.listen(port, hostname, () => {
  console.log(`GOOD: Server Running at http://${hostname}:${port}/`);
});
