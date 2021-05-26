import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";

describe("GET api/books/:id", () => {
  const book = {
    title: "node.js",
    genre: "backend",
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
  let res;
  let token;
  const fakeId = "6090dc136ef8d46545fdsf6sd5";

  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
  
      const newUser = await request(app).post("/api/register").send(user);
      const login = await request(app).post("/api/login").send(user);
      token = login.body.token;
    } catch (error) {
      console.log(error)
    }
  });

  afterEach(async () => {
    try {
      await mongoose.connection.dropCollection("books");
    } catch (error) {
      console.log(error)
    }
  });

  it("should respond with a 200 status", async () => {
    try {
      const newbook = await request(app)
        .post("/api/books")
        .send(book)
        .set("Authorization", `Bearer ${token}`)

      const id = newbook.body._id

      res = await request(app).get(`/api/books/${id}`)
    } catch (error) {
      console.log(error)
    }
    expect(res.status).toBe(200)
  })

  it("should respond with a object containing", async () => {
    try {
      res = await request(app)
        .post("/api/books")
        .send(book)
        .set("Authorization", `Bearer ${token}`)
    } catch (error) {
      console.log(error)
    }
    expect(JSON.parse(res.text)).toEqual(bookModel)
  });

  it("If not found return 404",async () => {
    try {
      const newbook = await request(app)
        .post("/api/books")
        .send(book)
        .set("Authorization", `Bearer ${token}`)

      res = await request(app).get(`/api/books/${fakeId}`)
    } catch (error) {
      console.log(error)
    }
    expect(res.status).toBe(404)
  })

  afterAll(async () => {
    try {
      await mongoose.disconnect()
    } catch (error) {
      console.log(error)
    }
  })
})
