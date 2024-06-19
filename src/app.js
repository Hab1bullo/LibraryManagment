import express from "express";
import { router } from "./routes/index.route.js";
import { userTable } from "./models/user.model.js";
import { dropTable } from "./services/universal.service.js";
import { otpmodel } from "./models/userOtp.model.js";
import { refreshModel } from "./models/refreshtoken.model.js";
import { authorModel } from "./models/author.model.js";
import { bookModel } from "./models/book.model.js";
import { orderModel } from "./models/order.model.js";
import { genreModel } from "./models/genre.model.js";
// import { logMiddleware } from "./middlewares/log.middleware.js";

const createTables = async (req, res) => {

    try {

        await userTable();
        await otpmodel();
        await refreshModel();
        await authorModel();
        await genreModel();
        await bookModel();
        await orderModel();

        return res.status(200).send({
            message: "Tables created..."
        });

    } catch (e) {
        console.log(e);
        return res.status(200).send({
            message: "Error creating table",
            error: e
        });
    }
}

const deleteTable = async (req, res) => {
    try {
        const table = req.body.table
        await dropTable(table);
        
        return res.status(200).send({
            message: `${table} table deleted`
        });

    } catch (e) {
        console.log(e);
        return res.status(200).send({
            message: "Error creating table",
            error: e
        });
    }
}



export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logMiddleware);
app.get('/setup', createTables);
app.delete('/deletetable', deleteTable);
app.use('/api',router);



