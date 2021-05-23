import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'

describe("DELETE /book/:id", () => {
    const newBook = {
        title: "node.js",
        genre: "backend",
        author: "c.marvin",
        picture: "javascript.js",
    }
    const user = {
        email: "djepeno@gmail.com",
        password: "dulonx",
    }
    let token
    beforeAll(async() => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        const newUser = await request(app).post("/api/register").send(user) 
        const login = await request(app).post("/api/login").send(user)
        token = login.body.token
    }, 5000)  

    it("Should respond 200 after delete succesful", () => {
        
    })
})