import { Model, model, Schema } from "mongoose";
import { BookInstanceMethod, IBook } from "../interfaces/book.interface";

const booksSchema = new Schema<IBook, Model<IBook>, BookInstanceMethod>({
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
},
    {
        versionKey: false,
        timestamps: true
    }
);


booksSchema.static('unavailableIfEmpty', async function main(id: string) {

    const data = await Book.findById(id);

    if (data?.copies === 0) {
        await Book.findByIdAndUpdate(id, {
            $set: {
                available: false
            }
        },
            {
                runValidators: true
            });
    }
}
);

export const Book = model<IBook, BookInstanceMethod>('Book', booksSchema);
