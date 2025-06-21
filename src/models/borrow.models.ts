import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

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

export const Borrow = model<IBorrow>('Borrow', borrowSchema); 