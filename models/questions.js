// Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Quiz Schema
const QuestionsSchema = new Schema({
    name: String,
    question: Array,
    created_at: Date,
  	updated_at: Date,
  	create_by: String
})

module.exports = mongoose.model('Questions', QuestionsSchema)
