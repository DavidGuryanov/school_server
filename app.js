import express from 'express'
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv"
import authRoutes  from "./routes/auth.js"

dotenv.config()

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodecluster.kzooe.mongodb.net/school?retryWrites=true&w=majority`

const server = express()

server.use(bodyParser.json());
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next();
});

server.get('/test', (req,res) => {
  console.log('got request')
  return res.json({message: 'workin'})
})

// server.use('/feed', feedRoutes);
server.use('/auth', authRoutes);

mongoose.connect(MONGO_URI)
  .then(result => {
    console.log('Connection with db established')
    server.listen(process.env.PORT || 8080);
  })
  .catch(err => console.log(err, 'err'))
