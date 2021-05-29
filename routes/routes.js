import express from "express";
import {
  addBook,
  deleteBook,
  getOneBook,
  getBooks,
  updateBook,
} from "../controllers/bookController.js";
import { login, register } from "../controllers/userController.js";
import {auth} from '../controllers/auth/auth.js'
import {config, server} from '../docs-API/docs-config.js'

const router = express.Router();

router.use("/", server, config)

/**
 * @swagger
 * /api/books:
 *    get:
 *      description: get all books
 *      responses: 
 *          '200': 
 *            description: Success
 */
router.get("/api/books", getBooks);

/**
 * @swagger
 * /api/books/:id:
 *    get:
 *      description: get one book
 *      responses: 
 *          '200': 
 *            description: Success
 */
router.get("/api/books/:id", getOneBook);

/**
 * @swagger
 * /api/books/:id:
 *    get:
 *      description: get one book
 *      responses: 
 *          '200': 
 *            description: Success
 */
router.post("/api/books", auth, addBook);

/**
 * @swagger
 * /api/register
 *    post:
 *      description: register
 *      responses: 
 *          '200': 
 *            description: Success
 */
router.post("/api/register", register);

/**
 * @swagger
 * /api/login:
 *    post:
 *      description: login
 *      responses: 
 *          '200': 
 *            description: Success
 */
router.post("/api/login", login);

/**
 * @swagger
 * /api/books/:id:
 *    put:
 *      description: update one book
 *      responses: 
 *          '200': 
 *            description: Success
 */
router.put("/api/books/:id", auth , updateBook);

/**
 * @swagger
 * /api/books/:id:
 *    delete:
 *      description: delete one book
 *      responses: 
 *          '200': 
 *            description: Success
 */
router.delete("/api/books/:id", auth, deleteBook);

export default router;
