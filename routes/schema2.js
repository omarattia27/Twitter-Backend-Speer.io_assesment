import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const registerSchema = new mongoose.Schema({
    user: String,
    password: String,
    posts: Array,
    chats: Array
});

registerSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        user: this.user, 
        admin: this.admin       
      },
      "Key"   //In real application the key will be stored in enviroment variable
    );
    return token;
  };

var Register = mongoose.model('Register', registerSchema);

export default Register;