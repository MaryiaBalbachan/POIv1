"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const categorySchema = Schema({
  loc: String,
  country: String,
});

module.exports = Mongoose.model("Category", categorySchema);

