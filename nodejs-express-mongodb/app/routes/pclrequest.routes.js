module.exports = app => {
  const pclrequests = require("../controllers/pclrequest.controller.js");

  var router = require("express").Router();

  // Create a new pclrequest
  router.post("/", pclrequests.create);

  // Retrieve all pclrequests
  router.get("/", pclrequests.findAll);

  // Retrieve a single pclrequest with id
  router.get("/:id", pclrequests.findOne);

  // Update a pclrequest with id
  router.put("/:id", pclrequests.update);

  // Delete a pclrequest with id
  router.delete("/:id", pclrequests.delete);

  // Create a new pclrequest
  router.delete("/", pclrequests.deleteAll);

  app.use("/api/pclrequests", router);
};
