"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const stationSchema = new Schema({
  name: String,
  location: String,
  year: Number,
  boat: String,
  description: String,
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // category: {
  //   type: Schema.Types.ObjectId,
  //  ref: "Category",
  //},
});

module.exports = Mongoose.model("Lifeboatstation", stationSchema);
