import { Router } from "express";
import { userRouter } from "./user.route.js";
import { authorRouter } from "./author.route.js";
import { genreRouter } from "./genre.route.js";
import { bookRouter } from "./book.route.js";

export const router =  Router();

router.use('/', userRouter);
router.use('/', authorRouter);
router.use('/', genreRouter);
router.use('/', bookRouter);