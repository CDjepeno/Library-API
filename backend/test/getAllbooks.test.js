import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";

describe("GET /api/books", () => {
  
  const books = [
    {
      title: "node.js",
      genre: "backend",
      author: "c.marvin",
      picture: "node.png"
    }, 
    {
      title: "python",
      genre: "backend",
      author: "c.Bob",
      picture: "python.png",
    },
    {
      title: "rust",
      genre: "backend",
      author: "c.kalvin",
      picture: "rust.png",
    },
    {
      title: "symfony",
      genre: "backend",
      author: "c.potentier",
      picture: "symfony.png",
    }
  ];
  const book = {
    title: "symfony",
    genre: "backend",
    author: "c.potentier",
    picture: "symfony.png"
  }
  let res
  let token

  const user = {
    email: "djepeno@gmail.com",
    password: "dulonx",
  };

  const allBooks = async () => {
    for (const b in books) {
      const books = await request(app).post("/api/books").send(b).set("Authorization", `Bearer ${token}`);
    }
    return books
  }
  
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });  
      await request(app).post("/api/register").send(user);
      const res = await request(app).post("/api/login").send(user);
      token = res.body.token;

      await request(app).post("/api/books").send(book).set("Authorization", `Bearer ${token}`);
      
      allBooks()
    } catch (error) {
      console.log(error);
    }
  });

  it("should respond with a 200 status code", async () => {
    try {
      res = await request(app).get("/api/books");
    } catch (error) {
      console.log(error);
    }
    expect(res.status).toEqual(200);
  });

  it("should respond contain array of object or null", async () => {
    try {
      res = await allBooks();
      } catch (error) {
        console.log(err)
      }
      expect.arrayContaining([expect.objectContaining(res)]);
  });


  afterAll(async () => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log(error);
    }
  });
});
