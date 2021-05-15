import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

describe("PUT /books/:id", () => {
  const id = "609f45f1dd9a49632a4e049e";
  const upbook = {
    title: "node.js",
    genre: "backend",
    author: "c.marvin",
    picture: "javascript.js",
  };
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

  it("Should respond 200 for update sucessfully", async () => {
    const res = await request(app).put(`/api/books/${id}`).send(upbook)
    expect(res.status).toBe(200)
  });

  it("Should respond contain valid object", async () => {
    request(app)
        .put(`/api/books/${id}`).send(upbook)
        .then(book => {
            expect(JSON.parse(book.text)).toEqual(bookModel)
        })
  });
});
