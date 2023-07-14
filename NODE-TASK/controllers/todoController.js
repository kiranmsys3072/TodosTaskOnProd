const Todo = require("../model/todoModel");
const dateFunctions = require("../utils/date");

//testing api for checking the routes working or not
const testingApi = (req, res) => {
  res.send("working");
};

//get All Todos
const getAllTodos = async (req, res) => {
  try {
    //pagenation
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    const todos = await Todo.find().sort("title").skip(skip).limit(limit);
    if (!todos || todos.length < 1) {
      return res.status(404).json({
        success: false,
        error: "no todos found",
      });
    }
    res.status(200).json({
      success: true,
      todos: todos,
      numberOfTodos: todos ? todos.length : 0,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

//Post Data to db
const postData = async (req, res) => {
  if (!req.body) {
    return res.status(404).json({
      success: false,
      error: "no data found in request body",
    });
  }
  try {
    const todos = await Todo.insertMany(req.body);
    if (!todos) {
      res.status(400).json({
        success: false,
        error: "data not created",
      });
    }
    res.status(201).json({
      success: true,
      message: "data Inserted in db",
      totalInserted: todos.length,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: "Bad Request" });
  }
};

//CreateTodo
const createTodo = async (req, res) => {
  const { title, context, starred, deleted, createdAt } = req.body;

  try {
    const date = dateFunctions.FormateCustomDate(createdAt);
    //create todo
    const todo = new Todo({
      title,
      context,
      starred,
      deleted,
      createdAt: date,
    });
    const savedTodo = await todo.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: "Bad Request" });
  }
};

//get todo by id
const getTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);

    res.status(200).json({
      success: true,
      todo: todo,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

//starred todo
const staredTodos = async (req, res) => {
  try {
    const completed = await Todo.find({ starred: true }).sort("name");
    if (!completed || completed.length < 1) {
      return res.status(404).json({
        success: false,
        error: "no starred todos available",
      });
    }
    res.status(200).json({
      success: true,
      todos: completed,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

//deleted todo
const deletedTodos = async (req, res) => {
  try {
    const deletedTodos = await Todo.find({ deleted: true }).sort("name");
    if (!deletedTodos || deletedTodos.length < 1) {
      return res.status(404).json({
        success: false,
        message: " todos not found",
      });
    }
    res.status(200).json({
      success: true,
      deletedTodos: deletedTodos,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

//update todo by idA
// const updateTodo = async (req, res) => {
//   const { title, context, deleted,starred } = req.body;

//  try {

// if((!(title || context || starred || deleted))){
//   return res.status(404).json({
//     success:false,
//     error:'Bad Request'
//   })
// }

//     const updated = await Todo.findByIdAndUpdate(updatedId,
//      title,
//      context,
//      starred,
//      deleted
//     );

//     const updatedTodo = await Todo.findById(updatedId);
//     res.status(200).json({
//       success: true,
//       todo: updatedTodo,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: false, error: "Internal Server Error" });
//   }
// };

const updateTodo = async (req, res) => {
  const { title, context, deleted, starred } = req.body;
  const id = req.params.id;
  try {
    if (!(title || context || starred || deleted)) {
      return res.status(404).json({
        success: false,
        error: "Bad Request",
      });
    }
    const update = await Todo.findByIdAndUpdate(id, {
      title: title,
      context: context,
      starred: starred,
      deleted: deleted,
    });
    const updatedTodo = await Todo.findById(id);
    res.status(200).json({
      status: true,
      todo: updatedTodo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

//searching todo item by keawords
const keywords = async (req, res) => {
  const { title, context } = req.query;
  let queryObj = {};
  try {
    if (title) {
      queryObj.title = { $regex: title, $options: "i" };
    }
    if (context) {
      queryObj.context = context;
    }
    const data = await Todo.find(queryObj);
    if (data.length < 1) {
      return res.status(404).json({
        success: false,
        error: "resource not found",
      });
    }
    return await res.status(200).json({
      success: true,
      todos: data,
      total: data.length,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
//delete single todo
const deleteSingleTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const update = await Todo.findByIdAndUpdate(id, {
      deleted: true,
    });
    if (!update) {
      return res.status(404).json({ success: false, error: "not deleted" });
    }
    return res.status(200).json({
      success: true,
      message: "Your todo deleted successfully..",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  testingApi,
  postData,
  getAllTodos,
  createTodo,
  getTodo,
  staredTodos,
  deletedTodos,
  updateTodo,
  keywords,
  deleteSingleTodo,
};
