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

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    await request(app).post("/api/register").send(user);
  });

  it("Should login successful respond 200", async () => {
    const login = await request(app).post("/api/login").send(user);
    expect(login.status).toEqual(200);
  });

  it("Should receive token after respond 200", async () => {
    const login = await request(app).post("/api/login").send(user);
    expect(login.body.token).toBeDefined();
  });

  it("Should login fail respond 404", async () => {
    const login = await request(app).post("/api/login").send(fakeUser);
    expect(login.status).toEqual(404);
  });

  afterAll(async () => {
    await mongoose.connection.dropCollection("users");
    await mongoose.disconnect();
  });
});
