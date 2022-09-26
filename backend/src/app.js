const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

app.use("/comments", require("./routes/comment.route"));

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
