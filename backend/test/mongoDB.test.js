import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";

describe("mongo", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async (_) => {
    await mongoose.disconnect();
  });

  it("Connection mongoDB success", () => {
    request(app).get("/api/books").expect(200).end;
  });
});
