import { Router } from "express";

export const bookRouter = Router();

bookRouter.post('/books', postBook);