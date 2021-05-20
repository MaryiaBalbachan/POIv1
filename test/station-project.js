"use strict";

const axios = require("axios");
const baseUrl = "http://localhost:3000";

class StationProject {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    const response = await axios.get(this.baseUrl + "/api/users");
    return response.data;
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    const response = await axios.post(this.baseUrl + "/api/users", newUser);
    return response.data;
  }

  async deleteAllUsers() {
    const response = await axios.delete(this.baseUrl + "/api/users");
    return response.data;
  }

  async deleteOneUser(id) {
    const response = await axios.delete(this.baseUrl + "/api/users/" + id);
    return response.data;
  }

  /*async addStation(newLifeboatstation) {
    try {
      const response = await axios.post(this.baseUrl + "/api/lifeboatstations", newLifeboatstation);
      console.log(response);
      return response.data;
    } catch (e) {
      return null;
    }
  }*/

  async addStation(id, lifeboatstation) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users/" + id + "/lifeboatstations", lifeboatstation);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getStations(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id + "/lifeboatstations");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllStations() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/lifeboatstations");
      return response.data;
    } catch (e) {
      return null;
    }
  }


}

module.exports = StationProject;