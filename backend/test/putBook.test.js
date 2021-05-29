import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import BookModel from "../models/bookModel.js";
import UserModel from "../models/userModel.js";
import { book, bookModel, bookUpdate, fakeId, user } from "./utils.js";

describe("PUT /books/:id", () => {
  let token;
  let id;

  beforeAll(async () => {
    const newbook = await BookModel.create(book);

    id = newbook._id;

    await UserModel.create(user);

    const newUser = await request(app).post("/api/login").send(user);

    token = newUser.body.token;
  });

  it("Should respond 200 for update sucessfully", async () => {
    await request(app)
      .put(`/api/books/${id}`)
      .send(bookUpdate)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("If not found return 404", async () => {
    await request(app)
      .put(`/api/books/${fakeId}`)
      .send(bookUpdate)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });

  it("Should respond contain valid object", async () => {
    await request(app)
      .put(`/api/books/${id}`)
      .send(bookUpdate)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(bookModel);
      });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection("users");
    await mongoose.connection.db.dropCollection("books");
  });
});
