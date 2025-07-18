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
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10, page = 1 } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        // const books = await Book.find(query).sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 }).limit(parseInt(limit as string));
        const sortField = sortBy;
        const sortOrder = sort === "desc" ? -1 : 1;
        const limitNumber = parseInt(limit, 10);
        const pageNumber = parseInt(page, 10);
        const skip = (pageNumber - 1) * limitNumber;
        const [books, total] = yield Promise.all([
            books_models_1.Book.find(query)
                .sort({ [sortField]: sortOrder })
                .skip(skip)
                .limit(limitNumber),
            books_models_1.Book.countDocuments(query),
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
        console.log(books);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
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
exports.booksRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const books = yield books_models_1.Book.create(body);
        // console.log(books);
        res.status(201).json({
            success: true,
            message: 'Books created successfully',
            books
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Book created failed",
            success: false,
            error,
        });
    }
}));
exports.booksRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const books = yield books_models_1.Book.findById({ _id: bookId });
        if (!books) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
            return;
        }
        books.title = (_a = updatedBody.title) !== null && _a !== void 0 ? _a : books === null || books === void 0 ? void 0 : books.title;
        books.description = (_b = updatedBody.description) !== null && _b !== void 0 ? _b : books === null || books === void 0 ? void 0 : books.description;
        books.isbn = (_c = updatedBody.isbn) !== null && _c !== void 0 ? _c : books === null || books === void 0 ? void 0 : books.isbn;
        books.author = (_d = updatedBody.author) !== null && _d !== void 0 ? _d : books === null || books === void 0 ? void 0 : books.author;
        books.image = (_e = updatedBody.image) !== null && _e !== void 0 ? _e : books.image;
        books.copies = (_f = updatedBody.copies) !== null && _f !== void 0 ? _f : books.copies;
        books.available = updatedBody.copies > 0 ? true : false;
        yield books.save();
        res.status(201).json({
            success: true,
            message: 'Book Updated Successfully',
            books
        });
    }
    catch (error) {
        console.log(error);
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
