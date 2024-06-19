import express from "express";
import { router } from "./routes/index.route.js";
import { logMiddleware } from "./middlewares/log.middleware.js";
import { createTables, deleteTable } from "./controllers/table.controller.js";



export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logMiddleware);

app.use('/api',router);

app.get('/setup', createTables);
app.delete('/deletetable', deleteTable);



