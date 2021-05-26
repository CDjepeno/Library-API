import app from "../app";
import request from "supertest";
import mongoose from "mongoose";

describe("Login /api/login", () => {
  const user = {
    email: "djepeno@gmail.com",
    password: "dulonx",
  };
  const fakeUser = {
    email: "ale@gmail.com",
    passwor: "jfsdf",
  };
  let res;
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await request(app).post("/api/register").send(user);
    } catch (error) {
      console.log(error);
    }
  });

  it("Should login successful respond 200", async () => {
    try {
      res = await request(app).post("/api/login").send(user);
    } catch (error) {
      console.log(error);
    }
    expect(res.status).toEqual(200);
  });

  it("Should receive token after respond 200", async () => {
    try {
      res = await request(app).post("/api/login").send(user);
    } catch (error) {
      console.log(error);
    }
    expect(res.body.token).toBeDefined();
  });

  it("Should login fail respond 404", async () => {
    try {
      res = await request(app).post("/api/login").send(fakeUser);
    } catch (error) {
      console.log(error);
    }
    expect(res.status).toEqual(404);
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
