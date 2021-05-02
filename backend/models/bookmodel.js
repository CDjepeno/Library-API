import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    title: {
        type: String, 
        require: true,
        lowercase: true,
        unique: true
    },
    genre: {
        type: String,
        require: true,
        lowercase: true
    },
    author: {
        type: String,
        require: true,
        lowercase: true
    },
    picture: {
        type: String,
        require: true
    }
})

Const Book = mongoose.model('Book', BookSchema);

export default Book