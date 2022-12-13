// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const { Schema } = mongoose;

const tutorielSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  date: { type: Date, default: Date.now },
  category: String,
});
const tutoriel = mongoose.model('tutoriel', tutorielSchema);
module.exports = tutoriel;