import { Router } from "express";
import { deleteOneAuthor, getAllAuthors, getOneAuthor, postAuthor, putOneAuthor } from "../controllers/author.contoller.js";
import { userMiddleware } from "../middlewares/auth.middleware.js";

export const authorRouter = Router();

authorRouter.post('/authors', userMiddleware, postAuthor);
authorRouter.get('/authors', userMiddleware,  getAllAuthors);
authorRouter.get('/authors/:uuid', userMiddleware,  getOneAuthor);
authorRouter.put('/authors/:uuid', userMiddleware,  putOneAuthor);
authorRouter.delete('/authors/:uuid', userMiddleware,  deleteOneAuthor);