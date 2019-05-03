// Imports

const express = require('express');
const helmet = require('helmet');

const server = express();

// Middleware

server.use(express.json());
server.use(helmet());

// Configure Routes

server.get('/', (req, res) => {
    res.send('Hi there!')
})

module.exports = server;