import mongoose from 'mongoose'
import app from '../app'
import request from 'supertest'
import BookModel from '../models/bookModel.js'

describe("POST api/books/", () => {
    const book = {
        title: "javascript",
        genre: "programmation",
        author: "c.marvin",
        picture: "javascript.js"
    }
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        });
    });
    
    afterAll(async () => {
        await mongoose.disconnect()
    });

    it("should respond 201 create book", () => {
        
        const Book = new BookModel(book)

        request(app).post('/api/books').send(book).expect(201)
        
    })

})