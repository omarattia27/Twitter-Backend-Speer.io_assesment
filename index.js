import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import api from './routes/api.js';
import auth from './routes/auth.js';
import chatAPI from './chatRoutes/api.js';
import { Server } from "socket.io";

const app = express();

app.use(bodyParser.json({  extended: true }))
app.use(bodyParser.urlencoded({  extended: true }))
app.use(cors());
app.use('/api', api);
app.use('/user', auth);
app.use('/api/chat', chatAPI);

const CONNECTION_URL = "mongodb+srv://Username:Password@cluster0.0ffel.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT|| 5000;
let server;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>server = app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

const io = new Server(server);

io.on('connection', (socket)=>{
    console.log("A user connected");

    socket.on("Join_Room", (data) => {
        socket.join(data);
        console.log("User Joined Room: " + data);
      });

    socket.on("message", (data) => {
       console.log(data);
       socket.to(data.room).emit('send', data.msg);
    });

    socket.on('disconnect', ()=>{
        console.log("User desconnedted");
    });

});
