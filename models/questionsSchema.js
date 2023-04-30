// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const questionSchema = new mongoose.Schema({
//     subject: {
//       type: String,
//       required: true
//     },
//     technology: {
//       type: String,
//       required: true
//     },
//     questions: [
//       {
//         type: String,
//         required: true
//       },
//       options: {
//           type: [
//               {
//                   text: String,
//                   isCorrect: Boolean
//               }
//           ],
//           required: true 
//       },
//       difficulty: {
//         type: String,
//         enum: ['Easy', 'Medium', 'Hard'],
//         required: true
//       }
//     ],
//     created_at: {
//       type: Date,
//       default: Date.now
//     },
//     tags: {
//       type: [String],
//       index: true
//     }
//   });
  
// const QuestionModel = mongoose.model("question", questionSchema);

// model.exports = { QuestionModel }


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  id: { type: Number, required: true },
  answer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const questionSchema = new Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  type: { type: String, required: true },
  options: [optionSchema]
});

const quizSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
  created_at: {type: Date, default: Date.now },
  questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
