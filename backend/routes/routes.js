import express from "express";
import {
  addBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/bookController.js";
import { login, register } from "../controllers/userController.js";

const router = express.Router();

router.get("/api/books", getBooks);

router.get("/api/books/:id", getBook);

router.post("/api/books", addBook);

router.post("/api/register", register);

router.post("/api/login", login);

router.put("/api/books/:id", updateBook);

router.delete("/api/books/:id", deleteBook);

export default router;
