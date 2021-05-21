"use strict";
const User = require("../models/user");
const Boom =require("@hapi/boom");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sanitizeHtml = require('sanitize-html');

const Accounts = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Lifeboat Stations Project" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup", { title: "Sign up to View Stations" });
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login", { title: "Login to Add and View Stations" });
    },
  },

  signup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().regex(/^[a-zA-Z\s'-]{3,15}$/),
        lastName: Joi.string().regex(/^[a-zA-Z\s'-]{3,30}$/),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,15}$/).required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("signup", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }
        const hash = await bcrypt.hash(payload.password, saltRounds);
        const newUser = new User({
          firstName: sanitizeHtml(payload.firstName),
          lastName: sanitizeHtml(payload.lastName),
          email: sanitizeHtml(payload.email),
          password: hash,
        });
        user = await newUser.save();
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
      } catch (err) {
        return h.view("signup", { errors: [{ message: err.message }] });
      }
    },
  },

  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  login: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,15}$/).required()
      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
          .view('login', {
            title: 'Sign in error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        await user.comparePassword(password);

        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
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

  updateSettings: {
    validate: {
      payload: {
        firstName: Joi.string().regex(/^[a-zA-Z\s'-]{3,15}$/),
        lastName: Joi.string().regex(/^[a-zA-Z\s'-]{3,30}$/),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,15}$/).required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("settings", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const userEdit = request.payload;
        console.log(userEdit);
        const hash = await bcrypt.hash(userEdit.password, saltRounds);
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        user.firstName = sanitizeHtml(userEdit.firstName);
        user.lastName = sanitizeHtml(userEdit.lastName);
        user.email = sanitizeHtml(userEdit.email);
        user.password = hash;
        await user.save();
        return h.redirect("/home");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Accounts;
