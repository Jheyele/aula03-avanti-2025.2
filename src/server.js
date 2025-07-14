import express from "express"
import { router } from "./routes/index.js";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(8082, () => {
    console.log("Running on port 8082")
})