import express from 'express';
//import mongoose from 'mongoose';
import schema from './chatSchema.js';

const router = express.Router();

export const getChats = async (req, res) => { 
    try {
        const chat = await schema.find();
        res.status(200).json(chat);
        console.log("Get request recieved",chat);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getChat = async (req, res) => { 
    const { id } = req.params;

    try {
        const chat = await schema.findById(id);
        
        res.status(200).json(chat);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createChat = async (req, res) => {
    const { room, chat ,selectedFile} = req.body;

    const Chat = new schema({ room, chat, selectedFile})

    try {
        await Chat.save();
        res.status(200).json(Chat);
        console.log("Post Request recieved", Chat);
    } catch (err) {
        console.log("Error");
        res.status(404).json({ message: err.message });
    }
}

export const putChat = async (req, res) => {
    console.log("put request recieved: ",req.body);
    console.log("put");
    const {input,user} = req.body; 
    try {
        const chat = await schema.findByIdAndUpdate(req.params.id, {$push: {chat: {input:input,user:user}}});
        res.status(200).json(input,user);
    } catch (err) {
        console.log("put request recieved: ",req.body);
        res.status(404).json({ message: err.message });
    }
}


export default router;