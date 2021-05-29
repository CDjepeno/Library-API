import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";
import BookModel from "../models/bookModel.js";
import { book, bookModel, fakeId } from "./utils.js";

describe("GET api/books/:id", () => {
  let id;

  beforeAll(async () => {
    const newBook = await BookModel.create(book);

    id = newBook._id;
  });

  it("should respond with a 200 status", async () => {
    await request(app)
      .get(`/api/books/${id}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("should respond with a object containing", async () => {
    await request(app)
      .get(`/api/books/${id}`)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(bookModel);
      });
  });

  it("If not found return 404", async () => {
    await request(app)
      .get(`/api/books/${fakeId}`)
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection("books");
  });
});
