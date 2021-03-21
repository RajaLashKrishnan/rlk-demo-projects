module.exports = app => {
  const relations = require("../controllers/relation.controller.js");

  var router = require("express").Router();

  // Create a new relation
  router.post("/", relations.create);

  // Retrieve all relations
  router.get("/", relations.findAll);

  // Retrieve a single relation with id
  router.get("/:id", relations.findOne);

  // Update a relation with id
  router.put("/:id", relations.update);

  // Delete a relation with id
  router.delete("/:id", relations.delete);

  // Create a new relation
  router.delete("/", relations.deleteAll);

  app.use("/api/relations", router);
};
