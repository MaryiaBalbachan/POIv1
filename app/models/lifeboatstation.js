"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const stationSchema = new Schema({
  name: String,
  location: String,
  dateopen: Date,
  boat: String,
  description: String,
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("Station", stationSchema);
