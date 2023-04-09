import { Router } from "express";
const router = Router();
import { dbConnection } from "../mongoConnection.js";

// Route to register a new user
router.route("/register").post(async (req, res) => {
    try {
        console.log("Register route called");
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Both username and password are required" });
        }

        const db = await dbConnection();
        console.log("Connected to DB");
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Username is already taken" });
        }

        const newUser = await usersCollection.insertOne({ username, password });
        console.log("New user created");
        res.status(201).json({
            message:
                "Signed up successfully. Now Log in using this information",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to login a user
router.route("/login").post(async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Both username and password are required" });
        }

        const db = await dbConnection();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ username, password });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Logged in successfully",
            user: {
                _id: user._id,
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
