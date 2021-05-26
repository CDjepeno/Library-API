import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

describe("PUT /books/:id", () => {
  const book = {
    title: "node.js",
    genre: "backend",
    author: "c.marvin",
    picture: "javascript.js",
  };
  const upbook = {
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
  let res;
  let token;

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
    } catch (error) {
      console.log(error);
    }
  });

  it("Should respond 200 for update sucessfully", async () => {
    try {
      const newbook = await request(app)
        .post("/api/books")
        .send(book)
        .set("Authorization", `Bearer ${token}`);
  
      const id = newbook.body._id;

      res = await request(app).put(`/api/books/${id}`).send(upbook).set("Authorization", `Bearer ${token}`);
    } catch (error) {
      console.log(error);  
    }
    console.log(res); 
    // expect(res.status).toBe(200);  
  });

  it("Should respond contain valid object", async () => {
    try {
      const newbook = await request(app)
        .post("/api/books")
        .send(book)
        .set("Authorization", `Bearer ${token}`);
  
      const id = newbook.body._id;

      res = request(app)
        .put(`/api/books/${id}`)
        .send(upbook)
        .set("Authorization", `Bearer ${token}`);
    } catch (error) {
        console.log(error);
    }
    console.log(res);
    expect(res.text).toEqual(bookModel); 
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
