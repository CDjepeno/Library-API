import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";
import { user, user2, userMissingEmail } from "./utils.js";

describe("Register /api/register", () => {
  it("should save the email and password to the Database", async () => {
    await request(app)
      .post("/api/register")
      .send(user)
      .then((res) => {
        expect(res.body.email).toBeDefined();
        expect(res.body.password).toBeDefined();
      });
  });

  it("should respond with a 201 status code", async () => {
    await request(app)
      .post("/api/register")
      .send(user2)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("should respond with a 404 status missing field", async () => {
    await request(app)
      .post("/api/register")
      .send(userMissingEmail)
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection("users");
  });
});
