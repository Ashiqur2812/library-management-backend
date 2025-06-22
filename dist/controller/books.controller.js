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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_models_1 = require("../models/books.models");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield books_models_1.Book.find(query).sort({ [sortBy]: sort === 'desc' ? -1 : 1 }).limit(parseInt(limit));
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            books
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Book retrieved failed",
            success: false,
            error,
        });
    }
}));
exports.booksRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const books = yield books_models_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            books
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Book retrieved failed",
            success: false,
            error,
        });
    }
}));
exports.booksRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const books = yield books_models_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: 'Books created successfully',
            books
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Book created failed",
            success: false,
            error,
        });
    }
}));
exports.booksRoutes.patch('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const books = yield books_models_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
        res.status(201).json({
            success: true,
            message: 'Book Updated Successfully',
            books
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Book Updated failed",
            success: false,
            error,
        });
    }
}));
exports.booksRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const books = yield books_models_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            books: null
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Book deleted failed",
            success: false,
            error,
        });
    }
}));
