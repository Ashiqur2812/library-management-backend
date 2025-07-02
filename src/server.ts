import 'dotenv/config';
import { Server } from 'http';
import mongoose from "mongoose";
import app from './app';

let server: Server;

async function main() {
    try {
        await mongoose.connect(process.env.DATABASE_URL!);
        console.log('Connected to mongoDB using mongoose');

        server = app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main(); 
