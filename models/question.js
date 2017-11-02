// Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Quiz Schema
const QuestionSchema = new Schema({
    question: String,
    options: Array,
    answer: Array,
    questions: String
})

module.exports = mongoose.model('Question', QuestionSchema)
