const mongoose = require("mongoose");
const assessmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
  },
  {
    collection: "assessment",
  }
);
module.exports = mongoose.model("assessment", assessmentSchema);
