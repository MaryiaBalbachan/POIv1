"use strict";
const Lifeboatstation = require("../models/lifeboatstation");
const User = require("../models/user");

const Lifeboatstations = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add a Station" });
    },
  },

  list: {
    handler: async function (request, h) {
      const lifeboatstations = await Lifeboatstation.find().populate("contributor").lean();
      return h.view("list", {
        title: "Stations already added",
        lifeboatstations: lifeboatstations,
      });
    },
  },

  addstation: {
    handler: async function (request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      const newStation = new Lifeboatstation({
        name: data.name,
        location: data.location,
        dateopen: data.dateopen,
        boat: data.boat,
        description: data.description,
        contributor: user._id,
      });
      await newStation.save();
      return h.redirect("/list");
    },
  },
};

module.exports = Lifeboatstations;
