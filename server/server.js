import express from "express";
import configRoutes from "./routes/index.js";

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());

configRoutes(app);

app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log(`Server is running on port ${PORT}`);
});
