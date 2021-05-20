"use strict";
const Lifeboatstation = require("../models/lifeboatstation");
const User = require("../models/user");
const Joi = require("@hapi/joi");
const Category = require("../models/category");
const sanitizeHtml = require('sanitize-html');

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
    validate: {
      payload: {
        name: Joi.string().regex(/^[a-zA-Z0-9\s'-]{3,30}$/),
        location: Joi.string().regex(/^[a-zA-Z0-9\s'-]{3,30}$/),
        year: Joi.number().integer().min(1785).max(2021).required(),
        boat: Joi.string().regex(/^[a-zA-Z0-9\s'-]{3,30}$/),
        description: Joi.string().regex(/^[a-zA-Z0-9\s'-]{10,250}$/),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("list", {
            title: "Adding station was unsuccessful",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        console.log(id);
        const user = await User.findById(id);
        console.log(user);
        const data = request.payload;
        console.log(data);
        //const rawCategory = request.payload.category.split(",");
        //const category = await Category.findOne({
        //  loc: rawCategory,
        // });
        const newStation = new Lifeboatstation({
          name: sanitizeHtml(data.name),
          location: sanitizeHtml(data.location),
          year: data.year,
          boat: sanitizeHtml(data.boat),
          description: sanitizeHtml(data.description),
          contributor: user._id,
          // category: category._id,
        });
        console.log(newStation);
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
    validate: {
      payload: {
        name: Joi.string().regex(/^[a-zA-Z0-9\s'-]{3,30}$/),
        location: Joi.string().regex(/^[a-zA-Z0-9\s'-]{3,30}$/),
        year: Joi.number().integer().min(1785).max(2021).required(),
        boat: Joi.string().regex(/^[a-zA-Z0-9\s'-]{3,30}$/),
        description: Joi.string().regex(/^[a-zA-Z0-9\s'-]{10,250}$/),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("list", {
            title: "Adding station was unsuccessful",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },

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
