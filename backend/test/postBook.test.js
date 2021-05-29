import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
import { book2, book, bookMissingField, bookModel, user } from "./utils";
import UserModel from "../models/userModel";

describe("POST api/books/", () => {
  let token;

  beforeAll(async () => {
    await UserModel.create(user);

    const login = await request(app).post("/api/login").send(user);
    token = login.body.token;
  });

  it("should respond 201 create book", async () => {
    await request(app)
      .post("/api/books")
      .send(book2)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  it("can be created correctly", async () => {
    await request(app)
      .post("/api/books")
      .send(book)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(bookModel);
      });
  });

  it("should respond with a 401 status code forget field", async () => {
    await request(app)
      .post("/api/books")
      .send(bookMissingField)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection("users");
    await mongoose.connection.db.dropCollection("books");
  });
});
