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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const books_models_1 = require("./books.models");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'book must be required'],
    },
    quantity: {
        type: Number,
        required: [true, 'quantity must be a number'],
        min: [1, 'quantity must be at least one']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date must be required']
    }
}, {
    timestamps: true,
    versionKey: false
});
borrowSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield books_models_1.Book.findByIdAndUpdate(doc.book, {
            $inc: { copies: -doc.quantity }
        }, {
            new: true, runValidators: true
        });
        yield books_models_1.Book.unavailableIfEmpty(doc.book.toString());
        next();
    });
});
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
