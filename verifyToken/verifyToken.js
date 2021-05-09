import jwt from 'jsonwebtoken';

export const verify = (req, res, next) => {
    const token = req.header("token");
    console.log(token)
    if (!token) return res.status(400).send('Authorization problem');

    try{
       req.user = jwt.verify(token, "Key");
       next();
    }catch(e){
       res.status(400).send("Yout token is either expired or invalid");
}
}
