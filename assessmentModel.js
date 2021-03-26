const mongoose = require("mongoose");
const assessmentSchema = new mongoose.Schema(
  {
    question1: {
      type: String,
    },
    question2: {
      type: String,
    },
    question3: {
      type: String,
    },
    question4: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "assessment",
  }
);
module.exports = mongoose.model("assessment", assessmentSchema);
