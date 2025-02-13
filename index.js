import e from "express";
import "dotenv/config";
import database from "./database.js";

const app = e();
const port = process.env.PORT;

app.use(e.json());

app.get("/tasks", async (req, res) => {
  const queryString = "SELECT * FROM tasks;";
  const { rows } = await database.query(queryString);
  res.status(200).json(rows);
});

app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const queryString =
    "INSERT INTO tasks (title, description) VALUES($1, $2) RETURNING *;";
  const { rows } = await database.query(queryString, [title, description]);
  res.status(200).json(rows);
});

app.listen(port, () => {
  console.log(`Server listening in port ${port}`);
});
