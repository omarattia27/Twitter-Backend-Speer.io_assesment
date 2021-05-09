import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    room: String,
    chat: [{ input: String, user: String}]
})

var chat = mongoose.model('chat', chatSchema);

export default chat;