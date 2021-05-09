import express from 'express';
import schema from '../schema.js';

const router = express.Router();

export const getTweet = async (req, res) => {
    console.log("get request recieved: ",req.body);

    try {
        const tweet = await schema.findById(req.params.id);
        if (!tweet) rturn(res.status(404).send("Sorry the tweet wasn't found"))
        res.status(200).json(tweet);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const postTweet = async (req, res) => {
    const {text, user} = req.body;

    const post = new schema({text, user})
    try {
        await post.save();
        res.status(200).json(post);
        console.log("Post Request recieved", post);

    } catch (err) {
        console.log("Error");
        res.status(404).json({ message: err.message });
    }
}

export const editTweet = async (req, res) => {
    const {text} = req.body; 
    try {
        const tweet = await schema.findByIdAndUpdate(req.params.id, {text: text});
        if(!tweet) return(res.statust(404).send("Couldn't find the tweet"));
        res.status(200).json(tweet);
    } catch (err) {
        console.log("put request recieved: ",req.body);
        res.status(404).json({ message: err.message });
    }
}

export const deleteTweet = async (req, res) => {
 
    try {
        const tweet = await schema.findByIdAndRemove(req.params.id);
        if(!tweet) return(res.statust(404).send("Couldn't find the tweet"));
        res.status(200).json(tweet);
    } catch (err) {
        console.log("delete request recieved: ",req.body);
        res.status(404).json({ message: err.message });
    }
}

export default router;