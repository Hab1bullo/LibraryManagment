import { Router } from "express";
import { allbooks, deleteOneBook, oneBook, postBook, putOneBook } from "../controllers/book.controller.js";
import { userMiddleware } from "../middlewares/auth.middleware.js";

export const bookRouter = Router();

bookRouter.post('/books', userMiddleware,  postBook);
bookRouter.get('/books', userMiddleware,  allbooks);
bookRouter.get('/books/:uuid', userMiddleware, oneBook);
bookRouter.put('/books/:uuid', userMiddleware, putOneBook);
bookRouter.delete('/books/:uuid', userMiddleware, deleteOneBook);

