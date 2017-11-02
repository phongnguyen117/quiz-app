// Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Quiz Schema
const CategoriesSchema = new Schema({
    name: String,
    section: String,
    created_at: { type: String, default: Date.now() },
  	updated_at: Date,
  	create_by: String
})

module.exports = mongoose.model('Categories', CategoriesSchema)
