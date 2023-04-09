import { Router } from "express";
const router = Router();
import { dbConnection } from "../mongoConnection.js";
import usersRoutes from "./users.js";
import path from "path";
const __dirname = path.resolve();

const constructorMethod = (app) => {
    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    router.get("/logout", (req, res) => {
        // Clear the session/cookie here if you're using any server-side session management
        res.redirect("/");
    });

    app.get("/signup", (req, res) => {
        res.render("signup");
    });

    app.use("/users", usersRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Route Not found" });
    });
};
export default constructorMethod;
