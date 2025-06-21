import express, { Request, Response } from 'express';
import { Book } from '../models/books.models';

export const booksRoutes = express.Router();

booksRoutes.get('/', async (req: Request, res: Response) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        books
    });
});

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const books = await Book.findById(bookId);
    res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        books
    });
});

booksRoutes.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);
    const books = await Book.create(body);

    res.status(201).json({
        success: true,
        message: 'Books created successfully',
        books
    });
});