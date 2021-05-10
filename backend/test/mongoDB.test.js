import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import router from '../routes/routes.js'
import request from 'supertest'
import app from '../server.js'



app 
    .use(express.json())
    .use("/api/books", router)


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
});

describe("test", () => {
    it("Connection mongoDB success", async() => {
        await request(app)
            .get('/api/books') 
            .expect(200)
            .end
    });
})