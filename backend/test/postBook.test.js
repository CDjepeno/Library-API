import mongoose from "mongoose";
import app from "../app";
import request from "supertest";

describe("POST api/books/", () => {
  const book = {
    title: "pytho",
    genre: "programmation",
    author: "c.marvin",
    picture: "javascript.js",
  }
  const failBook = {
    title: "pytho",
    genre: "programmation",
    author: "c.marvin"
  }
  const bookModel = {
    __v: expect.any(Number), 
    _id: expect.any(String),
    title: expect.any(String),
    genre: expect.any(String),
    author: expect.any(String),
    picture: expect.any(String),
  }
  const user = {
    email: "marc@gmail.com",
    password: "dulonx",
  };
  let token;
  let res;

  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
  
      const newUser = await request(app).post("/api/register").send(user); 
      const login = await request(app).post("/api/login").send(user);
      token = login.body.token 
    } catch (error) {
      console.log(error)
    }
  });

  afterEach(async() => {
    try {
      await mongoose.connection.dropCollection("books")
    } catch (error) {
      console.log(error)
    }
  })

  it("should respond 201 create book", async () => {
    try {
      res = await request(app).post("/api/books").send(book).set("Authorization", `Bearer ${token}`) 
    } catch (error) {
      console.log(error)
    }
    expect(res.status).toBe(201)  
  });

  it("can be created correctly", async() => {
    try {
      res = await request(app).post("/api/books").send(book).set("Authorization", `Bearer ${token}`)
    } catch (error) {
      console.log(error) 
    }
    expect(JSON.parse(res.text)).toEqual(bookModel)  
  }); 

  it("should respond with a 401 status code forget field", async () => {
    try {
      const res1 = await request(app).post("/api/books").send(book).set("Authorization", `Bearer ${token}`)
      res = await request(app).post("/api/books").send(failBook).set("Authorization", `Bearer ${token}`)
    } catch (error) {
      console.log(error)    
    }
    expect(res.status).toBe(404)
  })

  afterAll(async () => {
    try {
      await mongoose.connection.dropCollection("users");
      await mongoose.disconnect()
    } catch (error) {
      console.log(error)
    }
  });
});
