import express from 'express';
import mongoose from 'mongoose';
import indexRoot from './routes/index.js';

const app = express();

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
    await mongoose.connect(process.env.MONGO_URI || '')
    app.use("/",indexRoot);
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

start();