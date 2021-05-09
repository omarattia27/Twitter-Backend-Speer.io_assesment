import Register from '../schema2.js';
import bcrypt from 'bcrypt';
import express from 'express';

const router = express.Router();
export const createAcount = async (req, res) => {
    const {user, password} = req.body;
    console.log(req.body);
    let content = [];
    let chats = [];

    const account = new Register({user,password,content,chats});

    try {
        try {
            let existent_account = await Register.findOne({ user: req.body.user });
            console.log(existent_account);
            if (existent_account) return res.status(400).send('Username already used ');
        } catch (err) {
            console.log("good untill now");
        }

        const salt = await bcrypt.genSalt(10);
        console.log('Before hashing: ',account.password,' salt ',salt);
        account.password = await bcrypt.hash(account.password, salt);
        console.log('after hashing: ',account.password);
        await account.save();
        const token = account.generateAuthToken(); 
        res.status(200).json({token: token});
        console.log("New account was created ", account);

    } catch (err) {
        console.log("Error in createAccount");
        res.status(404).json({ message: err.message });
    }
}

export default router;