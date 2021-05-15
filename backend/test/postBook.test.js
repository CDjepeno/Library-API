import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
import BookModel from "../models/bookModel.js";

describe("POST api/books/", () => {
  const book = {
    title: "C++",
    genre: "programmation",
    author: "c.marvin",
    picture: "javascript.js",
  };
  const bookModel = {
      title: expect.any(String),
      genre: expect.any(String),
      author: expect.any(String),
      picture: expect.any(String)
  }
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  
  it("should respond 201 create book", async() => {
    const Book = new BookModel(book);

    const res = await request(app).post("/api/books").send(book) 
    expect(res.status).toBe(201) 
  });

  it("should book post toEqual object", () => {
    request(app)
        .post(`/api/books/`).send(book)
        .then(book => {
            expect(JSON.parse(book.text)).toEqual(bookModel) 
        }) 
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    return mongoose.disconnect()
  });
});
