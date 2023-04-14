import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

export default router;
