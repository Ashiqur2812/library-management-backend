import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { HydratedDocument } from "mongoose";
import { Book } from "./books.models";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
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
},
    {
        timestamps: true,
        versionKey: false
    }
);

borrowSchema.post(
    "save",
    async function (doc: HydratedDocument<IBorrow>, next: () => void) {
        await Book.findByIdAndUpdate(
            doc.book,
            {
                $inc: {
                    copies: -doc.quantity,
                },
            },
            { new: true, runValidators: true }
        );
        await Book.unavailableIfEmpty(doc.book.toString());
        next();
    }
);

export const Borrow = model<IBorrow>('Borrow', borrowSchema); 