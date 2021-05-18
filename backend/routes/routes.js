import express from "express";
import {
  addBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/bookController.js";
import { login, register } from "../controllers/userController.js";
import {auth} from '../controllers/auth/auth.js'

const router = express.Router();

router.get("/api/books", getBooks);

router.get("/api/books/:id", getBook);

router.post("/api/books", auth, addBook);

router.post("/api/register", register);

router.post("/api/login", login);

router.put("/api/books/:id", auth , updateBook);

router.delete("/api/books/:id", auth, deleteBook);

export default router;
