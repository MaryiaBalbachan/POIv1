"use strict";

const Lifeboatstation = require("../models/lifeboatstation");
const Boom = require("@hapi/boom");

const Lifeboatstations = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const lifeboatstations = await Lifeboatstation.find();
      return lifeboatstations;
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const lifeboatstation = await Lifeboatstation.findOne({ _id: request.params.id });
        if (!lifeboatstation) {
          return Boom.notFound("No station with this id");
        }
        return lifeboatstation;
      } catch (err) {
        return Boom.notFound("No User with this id");
      }
    },
  },


  findByContributor: {
    auth: false,
    handler: async function (request, h) {
      const lifeboatstations = await Lifeboatstation.find({ user: request.params.id });
      return lifeboatstations;
    },
  },

  /*addStation: {
    auth: false,
    handler: async function (request, h) {
      const newLifeboatstation = new Lifeboatstation(request.payload);
      const lifeboatstation = await newLifeboatstation.save();
      if (lifeboatstation) {
        return h.response(lifeboatstation).code(201);
      }
      return Boom.badImplementation("error adding station");
    },
  },*/

  addStation: {
    auth: false,
    handler: async function (request, h) {
      let lifeboatstation = new Lifeboatstation(request.payload);
      const user = await User.findOne({ _id: request.params.id });
      if (!user) {
        return Boom.notFound("No Candidate with this id");
      }
      lifeboatstation.user = user._id;
      lifeboatstation = await lifeboatstation.save();
      return lifeboatstation;
    },
  },




  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const lifeboatstation = await Lifeboatstation.deleteOne({ _id: request.params.id });
      if (lifeboatstation.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound("station not found");
    },
  },

  deleteAll: {
      auth: false,
      handler: async function (request, h) {
        await Lifeboatstation.deleteMany({});
        return { success: true };
      },
    },
  };

module.exports = Lifeboatstations;