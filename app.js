import express from "express";
import path from "path";
const app = express();
import cors from "cors";
import configRoutes from "./server/routes/index.js";

const __dirname = path.resolve();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

configRoutes(app);
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
