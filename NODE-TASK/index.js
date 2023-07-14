const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const connection = require("./db/connection");
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3030;
const morgan = require("morgan");
const cors = require("cors");

//cors middleware for routes access
app.use(cors({ "Access-Control-Allow-Origin": "*" }));
//middeleware for json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection function
connection();

//cors access enable

//console logs for api requests
app.use(morgan("dev"));

//routes should be handle for requests
app.use("/api", todoRoutes);

//handling error for non-matched routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status) || 500;
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT} `);
});
