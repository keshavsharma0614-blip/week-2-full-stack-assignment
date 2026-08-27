const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();

app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "To-Do REST API is running"
    });
});

// Add a new task
app.post("/tasks", async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
