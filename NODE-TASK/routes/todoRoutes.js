const express = require("express");
const router = express.Router();
const Todo = require("../model/todoModel");
const controller = require("../controllers/todoController");

//routes
router.post("/insert", controller.postData);
router.get("/todos", controller.getAllTodos);
router.post("/todo", controller.createTodo);
router.get("/todo/:id", controller.getTodo);
router.get("/starred", controller.staredTodos);
router.get("/deleted", controller.deletedTodos);
router.put("/update/:id", controller.updateTodo);
router.get("/queryTodos", controller.keywords);
router.put("/deletesingle/:id", controller.deleteSingleTodo);

//export router for access routes
module.exports = router;
