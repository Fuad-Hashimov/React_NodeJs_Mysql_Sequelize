const express = require("express");
const router = express.Router();
const db = require("../models");

//get all todos
router.get("/allTodo", (req, res) => {
  db.Todo.findAll().then((todos) => res.send(todos));
});

//get Todo By id
router.get("/todo/:id", (req, res) => {
  db.Todo.findAll({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    return res.json(result);
  });
});

//search findOne Todo
router.get("/todo/search/:text", (req, res) => {
  db.Todo.findOne({ where: { text: req.params.text } }).then((result) => {
    if (result === null || !result) {
      return res.status(404).json({ msg: "Not Found" });
    }
    res.json(result);
  });
});

//search findAll Todo
router.get("/todo/searchAll/:text", (req, res) => {
  db.Todo.findAll({ where: { text: req.params.text } }).then((result) => {
    if (result === null) {
      return res.status(404).json({ msg: "Not Found" });
    } else {
      res.json(result);
    }
  });
});

//post todo
router.post("/addTodo", (req, res) => {
  db.Todo.create({
    text: req.body.text,
    description: req.body.description,
  }).then((data) => res.send(data));
});

//Update Todo
router.put("/updateTodo", (req, res) => {
  db.Todo.update(
    {
      text: req.body.text,
      description: req.body.description,
    },
    {
      where: { id: req.body.id },
    }
  ).then(() => res.send("Todo Is Updated"));
});

//remove Todo
router.delete("/delete/:id", (req, res) => {
  db.Todo.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.send("Deleted Todos"));
});

module.exports = router;
