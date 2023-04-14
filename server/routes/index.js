import { Router } from "express";
const router = Router();
import loginRoute from "./loginRoute.js";
import studyPlansRoutes from "./studyPlansRoutes.js";
import { dbConnection } from "../mongoConnection.js";

import path from "path";
const __dirname = path.resolve();
const constructorMethod = (app) => {
    app.get("/", (req, res) => {
        res.render("index");
    });

    // Register studyPlansRoutes first
    app.use("/studyPlans", studyPlansRoutes);

    // Register loginRoute after studyPlansRoutes
    app.use("/", loginRoute);

    app.use("*", (req, res) => {
        console.log("Route not found");
        res.status(404).json({ error: "Route Not found" });
    });
};

export default constructorMethod;
