import { Server } from 'http';
import mongoose from "mongoose";
import app from './app';

let server: Server;
const PORT = 4000;

async function main() {
    try {
        const password = await mongoose.connect('');
        console.log('Connected to mongoDB using mongoose');

        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main(); 