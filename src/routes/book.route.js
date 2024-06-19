import { Router } from "express";
import { allbooks, oneBook, postBook, putOneBook } from "../controllers/book.controller.js";

export const bookRouter = Router();

bookRouter.post('/books', postBook);
bookRouter.get('/books', allbooks);
bookRouter.get('/books/:uuid', oneBook);
bookRouter.put('/books/:uuid', putOneBook);

