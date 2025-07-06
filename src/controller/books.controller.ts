import express, { Request, Response } from 'express';
import { Book } from '../models/books.models';

export const booksRoutes = express.Router();

booksRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10, page = 1 } = req.query;
        const query: any = {};

        if (filter) {
            query.genre = filter;
        }

        // const books = await Book.find(query).sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 }).limit(parseInt(limit as string));

        const sortField = sortBy as string;
        const sortOrder = sort === "desc" ? -1 : 1;
        const limitNumber = parseInt(limit as string, 10);
        const pageNumber = parseInt(page as string, 10);
        const skip = (pageNumber - 1) * limitNumber;

        const [books, total] = await Promise.all([
            Book.find(query)
                .sort({ [sortField]: sortOrder })
                .skip(skip)
                .limit(limitNumber),
            Book.countDocuments(query),
        ]);


        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            books,
            meta: {
                page: pageNumber,
                limit: limitNumber,
                total,
            },
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
        console.log(books);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
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

booksRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const books = await Book.create(body);
        // console.log(books);

        res.status(201).json({
            success: true,
            message: 'Books created successfully',
            books
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Book created failed",
            success: false,
            error,
        });
    }
});

booksRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const books = await Book.findById({ _id: bookId });
        if (!books) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
            return;
        }

        books.title = updatedBody.title ?? books?.title;
        books.description = updatedBody.description ?? books?.description;
        books.isbn = updatedBody.isbn ?? books?.isbn;
        books.author = updatedBody.author ?? books?.author;
        books.image = updatedBody.image ?? books.image;
        books.copies = updatedBody.copies ?? books.copies;
        books.available = updatedBody.copies > 0 ? true : false;
        await books.save();

        res.status(201).json({
            success: true,
            message: 'Book Updated Successfully',
            books
        });
    } catch (error) {
        console.log(error);
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