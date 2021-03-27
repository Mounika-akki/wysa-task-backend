const express = require("express");
// const mongodb = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const questions = require("./questionsModel");
const assessment = require("./assessmentModel");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
dotenv.config();

// connect to mongodb
const URI = process.env.DBURL || "mongodb://127.0.0.1:27017";
mongoose.connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to wysa",
  });
});

app.get("/questions", async (req, res) => {
  try {
    const result = await questions.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/assessment", async (req, res) => {
  try {
    const result = await assessment.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/assessment", async (req, res) => {
  try {
    const { name, question1, question2, question3, question4 } = req.body;
    const newAssessment = new assessment({
      name,
      question1,
      question2,
      question3,
      question4,
    });
    console.log(newAssessment);

    await newAssessment.save();
    res.status(200).json({
      message: "Assessment is submitted successfully",
      newAssessment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Assessment submission failed",
      error: err,
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
