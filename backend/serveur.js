const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const app = express();
const PORT = 5000;

const prisma = new PrismaClient();

// Use JSON middleware
app.use(bodyParser.json());

// Create a new todo
app.post("/api/todos", async (req, res) => {
  try {
    const { text } = req.body;
    const todo = await prisma.todo.create({
      data: { text },
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "An error occurred while creating a todo." });
  }
});

// Get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "An error occurred while fetching todos." });
  }
});

// Get a specific todo by ID
app.get("/api/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    console.error("Error fetching a todo:", error);
    res.status(500).json({ error: "An error occurred while fetching a todo." });
  }
});

// Update a todo by ID
app.put("/api/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { text } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        text,
      },
    });
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "An error occurred while updating a todo." });
  }
});

// Delete a todo by ID
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "An error occurred while deleting a todo." });
  }
});

app.get("/ping", (req, res) => {
  res.send("Backend is running....");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
