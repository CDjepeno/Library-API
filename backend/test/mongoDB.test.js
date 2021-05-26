import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";

describe("mongo", () => {
  let res
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })  
    } catch (error) {
      console.log(error)
    }
  });

  it("Connection mongoDB success",async () => {
    try {
      res = await request(app).get("/api/books").expect(200)
    } catch (error) {
      console.log(error)
    }
  })

  afterAll(async () => {
    try {
      await mongoose.disconnect()
    } catch (error) {
      console.log(error)
    }
  })

})
