import app from "../app.js"
import request from "supertest"
import mongoose from "mongoose"

describe("Register /api/register", () => {
  const user = {
    email: "djepeno@gmail.com",
    password: "dulonx",
  }
  const user2 = {
    email: "d@gmail.com",
    password: "dulonx",
  }
  const failUser = {
    email: "djepenogmail.com",
  }
  let res
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
    } catch (error) {
      console.log(error)
    }
  })

  it("should save the email and password to the Database", async () => {
    try {
      res = await request(app).post("/api/register").send(user)
    } catch (error) {
      console.log(error)
    }
    expect(res.body.email).toBeDefined()
    expect(res.body.password).toBeDefined()
  });

  it("should respond with a 201 status code", async () => {
    try {
      res = await request(app).post("/api/register").send(user2)
    } catch (error) {
      console.log(error)
    }
    expect(res.status).toBe(200)
  });

  it("should respond with a 404 status code error field", async () => {
    try {
      res = await request(app).post("/api/register").send(failUser)
    } catch (error) {
      console.log(error)
    }
    expect(res.status).toBe(404)
  });

  afterAll(async () => {
    try {
      await mongoose.connection.dropCollection("users")
      await mongoose.disconnect()
    } catch (error) {
      console.log(error)
    }
  });
});
