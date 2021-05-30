import app from "../app.js";
import request from "supertest";
import BookModel from "../models/bookModel.js";
import mongoose from "mongoose";
import { books } from "./utils.js";
import {getBooks} from '../controllers/bookController'

describe("GET /api/books", () => {
  beforeAll(async () => {
    for (const b of books) {
      await BookModel.create(b);
    }
  });
  
  it("should respond with a 200 status code", async () => {
    await request(app)
      .get("/api/books")
      .then((res) => {
        expect(res.status).toEqual(200);
      });
  });

  it("should respond contain array of object", async () => {
    await request(app)
      .get("/api/books")
      .then((res) => {
        expect.arrayContaining([expect.objectContaining(res)]);
      });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection("books");
  });
});
