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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'title must be required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'author must be required'],
        trim: true
    },
    genre: {
        type: String,
        enum: {
            values: [
                'FICTION',
                'NON_FICTION',
                'SCIENCE',
                'HISTORY',
                'BIOGRAPHY',
                'FANTASY'
            ],
            message: '{VALUE} is not a valid genre'
        },
        required: [true, 'genre must be required']
    },
    isbn: {
        type: String,
        required: [true, 'isbn must be mandatory and unique'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    copies: {
        type: Number,
        required: [true, 'copies must be required'],
        min: [0, 'copies must be positive number']
    },
    image: {
        type: String,
        required: [true, 'image must be required']
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
booksSchema.static('unavailableIfEmpty', function main(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield exports.Book.findById(id);
        if ((data === null || data === void 0 ? void 0 : data.copies) === 0) {
            yield exports.Book.findByIdAndUpdate(id, {
                $set: {
                    available: false
                }
            }, {
                runValidators: true
            });
        }
    });
});
exports.Book = (0, mongoose_1.model)('Book', booksSchema);
