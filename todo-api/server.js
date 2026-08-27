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

// Get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
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

// Update a task
app.put("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                completed: req.body.completed
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
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
});        res.status(400).json({
            error: error.message
        });
    }
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});        res.status(400).json({
            error: error.message
        });
    }
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
