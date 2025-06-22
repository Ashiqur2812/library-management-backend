import express, { Request, Response } from 'express';
import { Book } from '../models/books.models';
import { Borrow } from '../models/borrow.models';

export const borrowRoutes = express.Router();

borrowRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const borrows = await Borrow.aggregate([
            {
                $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind:'$book'
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$book.title',
                        isbn: '$book.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: borrows
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "Book borrowed failed",
            success: false,
            error,
        });
    }
});

borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        // console.log(body);
        const findBook = await Book.findById({ _id: body.book });

        if (!((findBook?.copies as number) >= body.quantity)) {
            res.status(400).json({
                message: "Book does not have enough available copies",
                success: false,
                error: "Not enough copies available",
            });
            return;
        }

        if (!findBook?.available) {
            res.status(400).json({
                message: "Book does not available",
                success: false,
                error: "Book not available",
            });
            return;
        }

        const borrow = new Borrow({
            book: body.book,
            quantity: body.quantity,
            dueDate: body.dueDate
        });

        
        await borrow.save();

        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Book borrowed failed",
            success: false,
            error,
        });
    }
});
