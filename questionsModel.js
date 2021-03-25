const mongoose = require("mongoose");
const questionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    option1: {
      type: String,
    },
    option2: {
      type: String,
    },
    option3: {
      type: String,
    },
  },
  {
    collection: "questions",
  }
);
module.exports = mongoose.model("questions", questionsSchema);
