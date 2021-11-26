const express = require("express");
const db = require("./models");
const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routerTodo = require("./routes/todo");
app.use("/api", routerTodo);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
