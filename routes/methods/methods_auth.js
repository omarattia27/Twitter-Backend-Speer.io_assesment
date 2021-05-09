import Register from '../schema2.js';
import bcrypt from 'bcrypt';
import express from 'express';

const router = express.Router();
export const login = async (req, res) => {
    let {user, password} = req.body;

    let account = new Register();
    account.password = password;
    account.user = user;

    try {
        let existent_account = await Register.findOne({ user: req.body.user });
        if (!existent_account) return res.status(400).send('Either username or password is incorrect user');

        const valid = await bcrypt.compare(account.password, existent_account.password);
        if (!valid) return res.status(400).send('Either username or password is incorrect')

        let token = account.generateAuthToken(); 
        res.status(200).json(token);

    } catch (err) {
        console.log("Error in LogIn");
        res.status(404).json({ message: err.message });
    }
}

export default router;