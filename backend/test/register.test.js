import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";

describe("Register /api/register", () => {
  const user = {
    email: "djepeno@gmail.com",
    password: "dulonx",
  };
  const user2 = {
    email: "d@gmail.com",
    password: "dulonx",
  };
  const failUser = {
    email: "djepenogmail.com"
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  it("should save the email and password to the Database", async () => {
    try {
      const newUser = await request(app).post("/api/register").send(user);

      expect(newUser.body._id).toBeDefined();
      expect(newUser.body.email).toBeDefined();
      expect(newUser.body.password).toBeDefined();
    } catch (error) {
      console.log(error);
    }
  });

  it("should respond with a 200 status code", async () => {
    try {
      const newUser = await request(app).post("/api/register").send(user2);
      expect(newUser.status).toBe(200);
    } catch (error) {
      console.log(error)
    }
  });

  it("should respond with a 401 status code unauthorized", async () => {
    try {
      const newUser = await request(app).post("/api/register").send(failUser);
      expect(newUser.status).toBe(401);
    } catch (error) {
      console.log(error)
    }
  }); 

  afterAll(async () => {
    await mongoose.connection.dropCollection("users");
    await mongoose.disconnect();
  });
});
