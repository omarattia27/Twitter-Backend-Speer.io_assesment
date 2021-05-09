import express from 'express';

import {login} from './methods/methods_auth.js';
import {createAcount} from './methods/methods_register.js';

const user = express.Router();

//user.put('/:id', put);
user.post('/login',  login);
user.post('/register', createAcount);

export default user;