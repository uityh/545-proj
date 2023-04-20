import { Router } from "express";
const router = Router();
import { dbConnection } from "../mongoConnection.js";
import {ObjectId} from 'mongodb';
import * as plans from './../../data/studyplans.js';

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

        const studyForms = []
        const newUser = await usersCollection.insertOne({ username, password, studyForms });
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
                _id: user._id.toString(),
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//need route to display studyform index for a given user
//currently just sends to example index
//TODO: send userForms to page and display them all like we do in the example
router.route("/home/:id")
    .get(async (req, res) => {
       try {
        const userForms = await plans.getAll(req.params.id);
        console.log(userForms);
        res.render("index");
       }catch(e) {
        res.status(400).json({error: e});
       } 
    })
    //create studyform for user, req.body should contain json with {"title": ""}
    //should send them to the form page afterwards
    .post(async (req, res) => {
        const formTitle = req.body.title;
        if (!formTitle) {
            return res.status(400).json({error: "no form title provided in body"})
        }
        try {
            let createdForm = await plans.createForm(req.params.id, formTitle);
            res.status(200).json(createdForm);
            
        }catch(e) {
            res.status(400).json({error: e});
        }
    });

//TODO: integrate with pages
router.route("/plans/:id")
    //get plan and send to specific page for said plan
    .get(async (req, res) => {
        try {
            const form = await plans.get(req.params.id);
            console.log(form);
        }
        catch(e) {
            res.status(400).json({error: e});
        }
    })
    //delete plan by id refresh user index page to reflect that
    .delete(async (req, res) => {
        try {
            let removedForm = await plans.remove(req.params.id);
            res.status(200).json({"plan": req.params.id, "deleted": true});
        }catch(e) {
            res.status(400).json({error: e});
        }
    })
    //update plan, req.body should contain a json structured as {title: "", sections: [{}]}
    //should send when save button is pressed on form page
    .put(async (req, res) => {
        const planInfo = req.body;
        if (!planInfo || Object.keys(planInfo).length === 0) {
            return res.status(400).json({error: "no fields in request body"});
        }

        try {
            await plans.update(req.params.id, planInfo.title, planInfo.sections);
        }catch(e) {
            return res.status(400).json({error: e});
        }
    })
    

export default router;
