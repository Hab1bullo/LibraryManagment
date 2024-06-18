import { Router } from "express";
import { userRouter } from "./user.route.js";
import { authorRouter } from "./author.route.js";
import { genreRouter } from "./genre.route.js";

export const router =  Router();

router.use('/api', userRouter);
router.use('/api', authorRouter);
router.use('/api', genreRouter);