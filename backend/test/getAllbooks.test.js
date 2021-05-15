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
      await request(app).get("/api/books").expect(200).end;
  });

  it("should respond contain array of object", async () => {
    try {
      request(app)
        .get("/api/books")
        .then(books => {
          expect.arrayContaining([
            expect.objectContaining(books)
          ]);
        });
    } catch (error) {
      console.log(error);
    }
  });
});
