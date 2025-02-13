import e from "express";
import "dotenv/config";
import database from "./database.js";

const app = e();
const port = process.env.PORT;

app.use(e.json());

app.get("/tasks", async (req, res) => {
  try {
    const queryString = "SELECT * FROM tasks;";
    const { rows } = await database.query(queryString);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
    const queryString =
      "INSERT INTO tasks (title, description) VALUES($1, $2) RETURNING *;";
    const { rows } = await database.query(queryString, [title, description]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening in port ${port}`);
});
