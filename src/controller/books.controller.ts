import express, { Request, Response } from 'express';
import { Book } from '../models/books.models';

export const booksRoutes = express.Router();

booksRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
        const query: any = {};

        if (filter) {
            query.genre = filter;
        }

        const books = await Book.find(query).sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 }).limit(parseInt(limit as string));


        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            books
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Book retrieved failed",
            success: false,
            error,
        });
    }
});

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const books = await Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            books
        });
    } catch (error) {
        res.status(500).json({
            message: "Book retrieved failed",
            success: false,
            error,
        });
    }
});

booksRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const books = await Book.create(body);

        res.status(201).json({
            success: true,
            message: 'Books created successfully',
            books
        });
    } catch (error) {
        res.status(500).json({
            message: "Book created failed",
            success: false,
            error,
        });
    }
});

booksRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const books = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

        res.status(201).json({
            success: true,
            message: 'Book Updated Successfully',
            books
        });
    } catch (error) {
        res.status(500).json({
            message: "Book Updated failed",
            success: false,
            error,
        });
    }
});

booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const books = await Book.findByIdAndDelete(bookId);

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            books: null
        });
    } catch (error) {
        res.status(500).json({
            message: "Book deleted failed",
            success: false,
            error,
        });
    }
});