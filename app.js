import express from "express";
import { config } from "dotenv";
import dbConnect from "./config/connectdb.js";
import route from "./routes/restaurantRoute.js";

const app = express();
config();
dbConnect();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Api is working...");
});
app.use('/api/v1', route);

const PORT = process.env.PORT || 4500;

app.listen(PORT, console.log(`Server start on port ${PORT}.`));