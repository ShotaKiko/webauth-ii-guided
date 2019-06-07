const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig ={
  name:'gorilla',
  secret:'hush hush',
  resave: false, //doesnt save if unchanged
  saveUnitialized: false
  cookie:{
    maxAge:60 * 60 * 1000, //1hr
    secure: false,
    httpOnly: true//not js accessible
  }
}

server.use(session(sessionConfig))
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.cookie('hello', 'world')
  res.json({ api: 'up' });
});

module.exports = server;
