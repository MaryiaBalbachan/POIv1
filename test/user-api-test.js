"use strict";

const assert = require("chai").assert;
const axios = require("axios");
const StationProject = require("./station-project");
const fixtures = require("./fixtures.json");
const _ = require('lodash');


suite("Users API tests", function () {
    let users = fixtures.users;
    let newUser = fixtures.newUser;

    const stationProject = new StationProject("http://localhost:3000");

    setup(async function () {
      await stationProject.deleteAllUsers();
    });

    teardown(async function () {
      await stationProject.deleteAllUsers();
    });

    test("create a user", async function () {
      const returnedUser = await stationProject.createUser(newUser);
      assert(_.some([returnedUser], newUser), "returnedUser must be a superset of newUser");
      assert.isDefined(returnedUser._id);
    });

    test("get a user", async function () {
      const c1 = await stationProject.createUser(newUser);
      const c2 = await stationProject.getUser(c1._id);
      assert.deepEqual(c1, c2);
    });

    test("get all users", async function () {
      for (let c of users) {
        await stationProject.createUser(c);
      }

      const allUsers = await stationProject.getUsers();
      assert.equal(allUsers.length, users.length);
    });

    test("get invalid user", async function () {
      const c1 = await stationProject.getUser("1234");
      assert.isNull(c1);
      const c2 = await stationProject.getUser("012345678901234567890123");
      assert.isNull(c2);
    });

    test("get user detail", async function () {
      for (let c of users) {
        await stationProject.createUser(c);
      }
      const allUsers = await stationProject.getUsers();
      for (var i = 0; i < users.length; i++) {
        assert(_.some([allUsers[i]], users[i]), "returnedUser must be a superset of newUser");
      }
    });

    test("delete a user", async function () {
      let c = await stationProject.createUser(newUser);
      assert(c._id != null);
      await stationProject.deleteOneUser(c._id);
      c = await stationProject.getUser(c._id);
      assert(c == null);
    });
  });