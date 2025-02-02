// models/Faq.js

const mongoose = require('mongoose');
const { Schema } = mongoose;


const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  question_hi: { type: String },
  answer_hi: { type: String },
  question_bn: { type: String },
  answer_bn: { type: String },
  // Add more languages as necessary
}, {
  timestamps: true,
});

module.exports = mongoose.model('Faq', faqSchema);
