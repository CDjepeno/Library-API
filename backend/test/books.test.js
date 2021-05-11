import app from '../app.js'
import request from 'supertest'
import mongoose from 'mongoose'

describe("mongo", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
    });

    afterAll(async _ => {
        await mongoose.disconnect();
    });

    it("should respond with a 200 status code", async() => {
        const books = await request(app).get('/api/books')
        expect(books.status).toBe(200)
    });
});