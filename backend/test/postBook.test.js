import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
import BookModel from "../models/bookModel.js";
import { auth } from "../controllers/auth/auth";

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
  const user = {
    email: "djepeno@gmail.com",
    password: "dulonx",
  };
  let token;
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    const newUser = await request(app).post("/api/register").send(user); 
    const login = await request(app).post("/api/login").send(user);
    token = login.body.token 
  }, 5000);

  afterEach(async() => {
    await mongoose.connection.dropCollection("books");
  });

  it("should respond 201 create book", async () => {
    const Book = new BookModel(book);
    const res = await request(app).post("/api/books").send(book).set("Authorization", `Bearer ${token}`) 
    expect(res.status).toBe(201);
  }, 500);

  it("can be created correctly", async() => {
    const res = await request(app).post("/api/books").send(book).set("Authorization", `Bearer ${token}`)
    expect(JSON.parse(res.text)).toEqual(bookModel)
  }); 

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });
});
