import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import BookModel from "../models/bookModel";
import UserModel from "../models/userModel";
import { book2, fakeId, user } from "./utils";

describe("DELETE /book/:id", () => {
  let token;
  let id;

  beforeAll(async () => {
    await UserModel.create(user);

    const newUser = await request(app).post("/api/login").send(user);

    token = newUser.body.token;

    const newUBook = await BookModel.create(book2);

    id = newUBook._id;
  });

  it("Should respond 200 after delete succesful", async () => {
    await request(app)
      .delete(`/api/books/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("should return 404 if book not found", async () => {
    await request(app)
      .get(`/api/books/${fakeId}`)
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection("users");
    await mongoose.connection.db.dropCollection("books");
  });
});
