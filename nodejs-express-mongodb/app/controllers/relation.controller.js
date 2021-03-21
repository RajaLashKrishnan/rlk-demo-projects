const db = require("../models");
const Relation = db.relations;
const Customer = db.customers;

// Create and Save a new Relation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.source) {
    res.status(400).send({ message: "Content can not be EEMMPPTY!" });
    return;
  }

  // Create a Relation
  // {
  //   source: String,
  //   target: String,
  //   targetName: String,
  //   relation: String
  // },
  const relation = new Relation({
    source: req.body.source,
    target: req.body.target,
    targetName: req.body.targetName,
    relation: req.body.relation
  });

  // Save Relation in the database
  relation
    .save(relation)
    .then(data => {
      console.log("\n>> Created Relation:\n", data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Relation."
      });
    });
};

// Retrieve all Relations from the database.
exports.findAll = (req, res) => {
  const requestType = req.query.requestType;
  var condition = requestType ? { requestType: { $regex: new RegExp(requestType), $options: "i" } } : {};

  Relation.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving relations."
      });
    });
};

// Find a single Relation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Relation.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Relation with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Relation with id=" + id });
    });
};

// Update a Relation by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Relation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Relation with id=${id}. Maybe Relation was not found!`
        });
      } else res.send({ message: "Relation was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Relation with id=" + id
      });
    });
};

// Delete a Relation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Relation.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Relation with id=${id}. Maybe Relation was not found!`
        });
      } else {
        res.send({
          message: "Relation was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Relation with id=" + id
      });
    });
};

// Delete all Relations from the database.
exports.deleteAll = (req, res) => {
  Relation.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Relations were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all relations."
      });
    });
};

// Find all published Relations
// exports.findAllPublished = (req, res) => {
//   Relation.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving relations."
//       });
//     });
// };
