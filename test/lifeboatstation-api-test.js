"use strict";

const assert = require("chai").assert;
const axios = require("axios");
//const StationProject = require("./station-project");
//const fixtures = require("./fixtures.json");
//const _ = require("lodash");

suite("Lifeboatstation API tests", function () {
//  let lifeboatstations = fixtures.lifeboatstations;
//  let newLifeboatstation = fixtures.newLifeboatstation;
//  const stationProject = new StationProject("http://localhost:3000");

  test("get stations", async function() {
    const response = await axios.get("http://localhost:3000/api/lifeboatstations");
    console.log(response.data);
  });

  test("get stations1", async function () {
    const response = await axios.get("http://localhost:3000/api/lifeboatstations");
    const lifeboatstations = response.data;
    assert.equal(6, lifeboatstations.length);
  });


  test("delete a station", async function () {
    let response = await axios.get("http://localhost:3000/api/lifeboatstations");
    let lifeboatstations = response.data;
    const originalSize = lifeboatstations.length;

    const oneStationUrl = "http://localhost:3000/api/lifeboatstations/" + lifeboatstations[0]._id;
    response = await axios.get(oneStationUrl);
    const oneStation = response.data;
    assert.equal(oneStation.name, "Tramore Lifeboat Station");

    response = await axios.delete("http://localhost:3000/api/lifeboatstations/" + lifeboatstations[0]._id);
    assert.equal(response.data.success, true);

    response = await axios.get("http://localhost:3000/api/lifeboatstations");
    lifeboatstations = response.data;
    assert.equal(lifeboatstations.length, originalSize - 1);
  });

  test("delete all stations", async function () {
    let response = await axios.get("http://localhost:3000/api/lifeboatstations");
    let lifeboatstations = response.data;
    const originalSize = lifeboatstations.length;
    assert(originalSize > 0);
    response = await axios.delete("http://localhost:3000/api/lifeboatstations");
    response = await axios.get("http://localhost:3000/api/lifeboatstations");
    lifeboatstations = response.data;
    assert.equal(lifeboatstations.length, 0);
  });

  /* test("add a station", async function () {
     const lifeboatstationsUrl = "http://localhost:3000/api/lifeboatstations";
     const newLifeboatstation = {
       name: 'Sligo Bay Lifeboat Station',
       location: 'Sligo Bay, co. Sligo',
       year: 1998,
       boat: 'ILB',
       description: "'Sheila and Dennis Tongue' B class inshore lifeboat operates in Sligo Bay",
       contributor: "60a74e0c38c3a55698da3a0c",
     };

     const response = await axios.post(lifeboatstationsUrl, newLifeboatstation);
     const returnedStation = response.data;
     assert.equal(201, response.status);
   });
 */

});

  /*setup(async function () {
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
    assert.deepEqual(c1, c2);*/




