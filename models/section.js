// Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Quiz Schema
const SectionSchema = new Schema({
    name: String,
    questions: String,
    created_at: Date,
  	updated_at: Date,
  	create_by: String
})

module.exports = mongoose.model('Section', SectionSchema)
