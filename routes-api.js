const Users = require("./app/api/users");
const Lifeboatstations = require("./app/api/lifeboatstations");

module.exports = [

  // existing routes

  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },


  { method: "GET", path: "/api/lifeboatstations", config: Lifeboatstations.findAll },
  { method: "GET", path: "/api/users/{id}/lifeboatstations", config: Lifeboatstations.findByContributor},
  { method: "POST", path: "/api/lifeboatstations", config: Lifeboatstations.addStation },
  { method: "DELETE", path: "/api/lifeboatstations", config: Lifeboatstations.deleteAll },

];