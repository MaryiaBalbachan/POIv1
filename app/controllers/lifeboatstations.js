"use strict";
const Lifeboatstation = require("../models/lifeboatstation");
const User = require("../models/user");
const Category = require("../models/category");

const Lifeboatstations = {
  home: {
    handler: async function (request, h) {
      //const categories = await Category.find().lean();
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
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        //const rawCategory = request.payload.category.split(",");
        //const category = await Category.findOne({
        //  loc: rawCategory,
        // });

        const newStation = new Lifeboatstation({
          name: data.name,
          location: data.location,
          year: data.year,
          boat: data.boat,
          description: data.description,
          contributor: user._id,
          // category: category._id,
        });
        await newStation.save();
        return h.redirect("/list");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

  deletestation: {
    handler: async function (request, h) {
      try {
        const station = Lifeboatstation.findById(request.params._id);
        console.log("Removing station from the list: " + station);
        await station.deleteOne();
        return h.redirect("/list");
      } catch
        (err) {
        return h.view("main", {errors: [{message: err.message}]});
      }
    },
  },

  editstation: {
    //validate with joi
    handler: async function (request, h) {
      try {
        const stationEdit = request.payload;
        const id = request.auth.credentials.id;
        const lifeboatstation = await Lifeboatstation.findById(id);
        lifeboatstation.name = stationEdit.name;
        lifeboatstation.location = stationEdit.location;
        lifeboatstation.year = stationEdit.year;
        lifeboatstation.boat = stationEdit.boat;
        lifeboatstation.description = stationEdit.description,
        await lifeboatstation.save();
        return h.redirect("/list");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

  showstation: {
    handler: async function (request, h) {
      try {
        const id = request.params._id
        const lifeboatstation = await Lifeboatstation.findById(id).lean()
        return h.view("editstation", { title: "Update Station", lifeboatstation: lifeboatstation });
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  showSettings: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        return h.view("settings", { title: "Account Settings", user: user });
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },


};

module.exports = Lifeboatstations;
