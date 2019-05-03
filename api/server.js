// Imports

const express = require('express');
const helmet = require('helmet');

const server = express();

// Import Routers

const projectsRouter = require('../projects/projects-router');
const actionsRouter = require('../actions/actions-router');

// Middleware

server.use(express.json());
server.use(helmet());

// Configure Routes

server.get('/', (req, res) => {
    res.send('Hi there!')
})

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;