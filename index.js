const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");


const app = express();
const server = http.createServer(app);
const PORT = 5000;

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

//routes
const route = require("./routes/index");
route(app);

//error middleware
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

//error handler
app.use((error, req, res, next) => {
  res.status(error.status).json({
    error: {
      status: error.status,
      message: error.message,
    },
  });
});
const url="mongodb+srv://admin:admin123@cluster0.kd226mz.mongodb.net/?retryWrites=true&w=majority"
// const url = "mongodb://localhost:27017/api_users";
mongoose
  .connect(url)
  .then(() => {
    console.log(`Mongo db is connected Successfully..${url}`);
  })
  .catch((error) => {
    console.error(`Server is not connected error:${error}`);
  });
server.listen(PORT, () => {
  console.log(
    `Express server is connected Successfully to http://localhost:${PORT}`
  );
});



