import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import UserModel from "../models/userModel";
import {
  fakeUser,
  user,
  userErrorPassword,
  userMissingEmail,
  userMissingPassword,
} from "./utils";

describe("Login /api/login", () => {
  beforeAll(async () => {
    await UserModel.create(user);
  });

  it("Should login successful respond 200", async () => {
    await request(app)
      .post("/api/login")
      .send(user)
      .then((res) => {
        expect(res.status).toEqual(200);
      });
  });

  it("Should receive token after respond 200", async () => {
    await request(app)
      .post("/api/login")
      .send(user)
      .then((res) => {
        expect(res.body.token).toBeDefined();
      });
  });

  it("Should login fail respond 404 because password wrong", async () => {
    await request(app)
      .post("/api/login")
      .send(userErrorPassword)
      .then((res) => {
        expect(res.status).toEqual(404);
      });
  });

  it("Should respond 404 because password field missing", async () => {
    await request(app)
      .post("/api/login")
      .send(userMissingPassword)
      .then((res) => {
        expect(res.status).toEqual(404);
      });
  });

  it("Should respond 404 because email field missing", async () => {
    await request(app)
      .post("/api/login")
      .send(userMissingEmail)
      .then((res) => {
        expect(res.status).toEqual(404);
      });
  });

  it("Should login fail respond 404 because unknown user ", async () => {
    await request(app)
      .post("/api/login")
      .send(fakeUser)
      .then((res) => {
        expect(res.status).toEqual(404);
      });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection("users");
  });
});
