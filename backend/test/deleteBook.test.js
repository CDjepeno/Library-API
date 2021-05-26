import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

describe("DELETE /book/:id", () => {
  const book = {
    title: "node.js",
    genre: "backend",
    author: "c.marvin",
    picture: "javascript.js",
  };
  const user = {
    email: "djepeno@gmail.com",
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

      await request(app).post("/api/register").send(user);
      const res = await request(app).post("/api/login").send(user);
      token = res.body.token;
    } catch (error) {
      console.log(error);
    }
  });

  it("Should respond 200 after delete succesful", async () => {
    try {
      const newbook = await request(app)
        .post("/api/books")
        .send(book)
        .set("Authorization", `Bearer ${token}`);
  
      const id = newbook.body._id;
  
      res = await request(app)
        .delete(`/api/books/${id}`)
        .set("Authorization", `Bearer ${token}`);
        
      } catch (error) {
        console.log(error)    
      }
      expect(res.status).toBe(200);
  });

  afterAll(async () => {
    try {
      await mongoose.connection.dropCollection("users"); 
      await mongoose.disconnect();
    } catch (error) {
      console.log(error);
    }
  });
});
