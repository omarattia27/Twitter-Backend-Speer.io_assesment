import express from 'express';
import {verify} from '../verifyToken/verifyToken.js';
import { getChats, getChat, createChat ,putChat} from './methods.js';

const chatAPI = express.Router();

chatAPI.get('/:id',verify, getChat);
//api.get('/',verify, getChats);
chatAPI.post('/',verify, createChat);
chatAPI.put('/:id',verify, putChat);

export default chatAPI;