import { Model } from "mongoose";

export interface IBook {
    title: string;
    author: string;
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
    isbn: string;
    description?: string;
    copies: number;
    available: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookInstanceMethod extends Model<IBook> {
    unavailableIfEmpty(id: string): void;
}

