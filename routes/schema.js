import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
    text: String,
    user: String
})

var tweetArticle = mongoose.model('tweetArticle', tweetSchema);

export default tweetArticle;