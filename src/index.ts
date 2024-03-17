import express from 'express';
import mongoose from 'mongoose';
import indexRoot from './routes/index.js';
import http from 'http';

// dev-code-start
import {WebSocketServer} from 'ws';
// dev-code-end

const app = express();
const server = http.createServer(app);

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
    app.use("/",indexRoot);
    server.listen(3000, () => {
        console.log('Server is running on port 3000');
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