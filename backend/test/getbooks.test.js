import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";

describe("/GET Books", () => {
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

  it("should respond with a 200 status code", () => {
    request(app).get("/api/books").expect(200).end;
  });

  it("should respond contain array of object", async () => {
    try {
      request(app)
        .get("/api/books")
        .then((_) => {
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              title: expect.any(String),
              genre: expect.any(String),
              author: expect.any(String),
              picture: expect.any(String),
            }),
          ]);
        });
    } catch (error) {
      console.log(error);
    }
  });
});
