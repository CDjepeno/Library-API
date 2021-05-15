import app from '../app'
import request from 'supertest'
import mongoose from 'mongoose'


describe("GET api/books/:id", () => {
    const id = "609df89cb7d6bdbb49117372"
    const fakeId = "6090dc136ef8d46545fdsf6sd5"
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

    it("should respond with a 200 status", async() => {
        const book = await request(app).get(`/api/books/${id}`)
        expect(book.status).toBe(200)
    })

    it("should respond with a object containing", async() => {
        const bookModel = {
            __v: expect.any(Number), 
            _id: expect.any(String),
            title: expect.any(String),
            genre: expect.any(String),
            author: expect.any(String),
            picture: expect.any(String) 
        }
        request(app)
            .get(`/api/books/${id}`)
            .then(book => {
                expect(JSON.parse(book.text)).toEqual(bookModel)
            }) 
            // .catch(err => console.log(err))
    })

    it("If not found return 404", () => {
        return request(app).get(`/api/books/${fakeId}`).expect(404)
    })

})
