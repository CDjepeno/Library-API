import app from '../app'
import request from 'supertest'
import mongoose from 'mongoose'


describe("GET /Books/:id", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        });
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
    });

    it("should respond with a 200 status", async() => {
        const id = "6090dc136ef8dba2b79cad18"
        const book = await request(app).get(`/api/books/${id}`)
        expect(book.status).toBe(200)
    })

    it("should respond with a objetct containing", async() => {
        const id = "6090dc136ef8dba2b79cad18"
        const book = await request(app).get(`/api/books/${id}`)
        expect(book.text).objectContaining()
    })

})
