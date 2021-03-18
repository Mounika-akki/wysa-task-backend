const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
dotenv.config();
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const DB_URL = process.env.DBURL || "mongodb://127.0.0.1:27017";
const client = new mongoClient(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to wysa",
  });
});
app.get("/questions", async (req, res) => {
  try {
    let db = client.connect();
    const result = await client
      .db("wysa")
      .collection("questions")
      .find()
      .toArray();
    res.status(200).send({
      result,
    });
    await client.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get("/assessment", async (req, res) => {
  try {
    let db = client.connect();
    const result = await client
      .db("wysa")
      .collection("assessment")
      .find()
      .toArray();
    await client.close();
    res.status(200).send({
      result,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/assessment", async (req, res) => {
  try {
    let db = client.connect();
    const data = {
      answers: req.body.answers,
    };
    console.log(data);
    await client.db("wysa").collection("assessment").insertOne(data);
    await client.close();
    res.status(200).send({
      message: "Assessment is submitted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
