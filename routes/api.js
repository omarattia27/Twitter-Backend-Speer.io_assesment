import express from 'express';
import {verify} from '../verifyToken/verifyToken.js';
import {postTweet,editTweet,getTweet, deleteTweet} from './methods/methods.js';

const api = express.Router();

api.post('/', verify, postTweet);              //Post a tweet
api.put('/:id',verify, editTweet);            //Edit the text content of a tweet
api.delete('/:id', verify, deleteTweet);       //Delete a tweet
api.get('/:id', getTweet);                     //get a tweet by id

export default api;