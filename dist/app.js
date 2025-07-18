"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./controller/books.controller");
const borrow_controller_1 = require("./controller/borrow.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://library-management-ashiqur-frontend.vercel.app'],
    credentials: true
}));
app.use('/api/books', books_controller_1.booksRoutes);
app.use('/api/borrow', borrow_controller_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Library Management Backend Server');
});
exports.default = app;
