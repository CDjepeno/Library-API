import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
import BookModel from "../models/bookModel.js";
import { any } from "joi";

describe("POST api/books/", () => {
  const book = {
    title: "pytho",
    genre: "programmation",
    author: "c.marvin",
    picture: "javascript.js",
  };
  const bookModel = {
    __v: expect.any(Number), 
    _id: expect.any(String),
    title: expect.any(String),
    genre: expect.any(String),
    author: expect.any(String),
    picture: expect.any(String),
  };
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

  });

  afterEach(async() => {
    await mongoose.connection.dropCollection("books");
  });

  it("should respond 201 create book", async () => {
    const Book = new BookModel(book);
    const res = await request(app).post("/api/books").send(book);
    expect(res.status).toBe(201);
  });

  it("can be created correctly", async() => {
    const res = await request(app).post("/api/books").send(book);
    expect(JSON.parse(res.text)).toEqual(bookModel);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });
});
