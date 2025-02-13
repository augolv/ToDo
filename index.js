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

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description || !id) {
      return res
        .status(400)
        .json({ error: "Title, description and id are required" });
    }
    const queryString =
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *;";
    const { rows } = await database.query(queryString, [
      title,
      description,
      id,
    ]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }
    const queryString = "DELETE FROM tasks WHERE id = $1;";
    const { rows } = await database.query(queryString, [id]);
    return res.status(204).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening in port ${port}`);
});
