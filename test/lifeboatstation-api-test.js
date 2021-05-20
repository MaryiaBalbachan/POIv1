"use strict";

const assert = require("chai").assert;
const StationProject = require("./station-project");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Lifeboatstation API tests", function () {
  let lifeboatstations = fixtures.lifeboatstations;
  let newLifeboatstation = fixtures.newLifeboatstation;

  const stationProject = new StationProject("http://localhost:3000");

  setup(async function () {
    await stationProject.deleteAllStations();
  });

  teardown(async function () {
  });

  test("a test function", function () {});

  test("add a station", async function () {
    const returnedStation = await stationProject.addStation(newLifeboatstation);
    console.log(returnedStation);
    assert(_.some([returnedStation], newLifeboatstation), "returnedStation must be a superset of newLifeboatstation");
    assert.isDefined(returnedStation._id);
  });

  test("get a station", async function () {
    const c1 = await stationProject.addStation(newLifeboatstation);
    const c2 = await stationProject.getStations(c1._id);
    assert.deepEqual(c1, c2);
  });



});