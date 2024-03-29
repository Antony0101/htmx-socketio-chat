import express, {urlencoded} from 'express';
import mongoose from 'mongoose';
import indexRoot from './routes/index.js';
import http from 'http';
import { Socket } from 'socket.io';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// dev-code-start
import {WebSocketServer} from 'ws';
// dev-code-end

const app = express();
const server = http.createServer(app);
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

async function start() {
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    })
    mongoose.connection.on('error', (err) => {
        console.error('Error connecting to MongoDB', err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });
    mongoose.connect(process.env.MONGO_URI || '').then(() => {}).catch((err) => console.error('Error connecting to MongoDB', err));
    app.use(express.static('static'));
    app.use("/",indexRoot);
    const port  = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    // dev-code-start
    const wsServer = new WebSocketServer({ server, path: '/dev-reload' });
    wsServer.on('connection', (socket) => {
        console.log('devlog : Client connected');
        socket.on('close', () => {
            console.log('devlog : Client disconnected');
        });
    });
    // dev-code-end
}

start();