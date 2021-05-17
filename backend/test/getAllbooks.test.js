import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";

describe("GET /api/books", () => {
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

  it("should respond with a 200 status code", async() => {
      const res = await request(app).get("/api/books")
      expect(res.status).toEqual(200)  
  });

  it("should respond contain array of object or null", async () => {
      request(app).get("/api/books")
      .then(books => {
        expect.arrayContaining([
          expect.objectContaining(books || null)
        ]);
      })
      .catch(err => console.log(err))
  });
});
