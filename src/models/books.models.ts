import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const booksSchema = new Schema<IBook>({
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
    available: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);

export const Book = model<IBook>('Book', booksSchema);