module.exports = app => {
  const graphdata = require("../controllers/graphdata.controller.js");

  var router = require("express").Router();

  // Create a new customer
  router.post("/", graphdata.create);
  // Retrieve all customers
  router.get("/", graphdata.findAll);
  // Delete all
  router.delete("/", graphdata.deleteAll);

  app.use("/api/graphdata", router);
};
