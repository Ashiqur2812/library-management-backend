import { Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const booksSchema = new Schema<IBook>({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        enum:['FICTION','NON_FICTION','SCIENCE','HISTORY','BIOGRAPHY','FANTASY']
    },
    isbn:{
        type:String,
        unique:true
    },
    description:{
        type:String, 
    },
    copies:{
        type:Number,
        required:true
    }
})