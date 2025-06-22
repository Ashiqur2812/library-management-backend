"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_models_1 = require("../models/books.models");
const borrow_models_1 = require("../models/borrow.models");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrows = yield borrow_models_1.Borrow.aggregate([
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
                $unwind: '$book'
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
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "Book borrowed failed",
            success: false,
            error,
        });
    }
}));
exports.borrowRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // console.log(body);
        const findBook = yield books_models_1.Book.findById({ _id: body.book });
        if (!((findBook === null || findBook === void 0 ? void 0 : findBook.copies) >= body.quantity)) {
            res.status(400).json({
                message: "Book does not have enough available copies",
                success: false,
                error: "Not enough copies available",
            });
            return;
        }
        if (!(findBook === null || findBook === void 0 ? void 0 : findBook.available)) {
            res.status(400).json({
                message: "Book does not available",
                success: false,
                error: "Book not available",
            });
            return;
        }
        const borrow = new borrow_models_1.Borrow({
            book: body.book,
            quantity: body.quantity,
            dueDate: body.dueDate
        });
        yield borrow.save();
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Book borrowed failed",
            success: false,
            error,
        });
    }
}));
