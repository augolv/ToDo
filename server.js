import e from "express";

const app = e();
const port = 3333;

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
