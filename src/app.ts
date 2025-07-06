import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import { booksRoutes } from './controller/books.controller';
import { borrowRoutes } from './controller/borrow.controller';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:
        ['http://localhost:5173', 'https://library-management-ashiqur-frontend.vercel.app'],
    credentials: true
}));

app.use('/api/books', booksRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management Backend Server');
});

export default app;
