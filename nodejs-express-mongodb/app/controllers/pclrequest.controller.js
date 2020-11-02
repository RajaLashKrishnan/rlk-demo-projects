const db = require("../models");
const Pclrequest = db.pclrequests;

// Create and Save a new Pclrequest
exports.create = (req, res) => {
  // Validate request
  if (!req.body.requestType) {
    res.status(400).send({ message: "Content can not be EEMMPPTY!" });
    return;
  }

  // Create a Pclrequest
  const pclrequest = new Pclrequest({
    requestType: req.body.requestType,
    targetEntityType: req.body.targetEntityType,
    targetEntityId: req.body.targetEntityId,
    changeAttribute: req.body.changeAttribute,
    changeValue: req.body.changeValue,
    status: req.body.status,
    message: req.body.message
  });

  // Save Pclrequest in the database
  pclrequest
    .save(pclrequest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pclrequest."
      });
    });
};

// Retrieve all Pclrequests from the database.
exports.findAll = (req, res) => {
  const requestType = req.query.requestType;
  var condition = requestType ? { requestType: { $regex: new RegExp(requestType), $options: "i" } } : {};

  Pclrequest.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pclrequests."
      });
    });
};

// Find a single Pclrequest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pclrequest.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Pclrequest with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Pclrequest with id=" + id });
    });
};

// Update a Pclrequest by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Pclrequest.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Pclrequest with id=${id}. Maybe Pclrequest was not found!`
        });
      } else res.send({ message: "Pclrequest was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pclrequest with id=" + id
      });
    });
};

// Delete a Pclrequest with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pclrequest.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Pclrequest with id=${id}. Maybe Pclrequest was not found!`
        });
      } else {
        res.send({
          message: "Pclrequest was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pclrequest with id=" + id
      });
    });
};

// Delete all Pclrequests from the database.
exports.deleteAll = (req, res) => {
  Pclrequest.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Pclrequests were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pclrequests."
      });
    });
};

// Find all published Pclrequests
// exports.findAllPublished = (req, res) => {
//   Pclrequest.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving pclrequests."
//       });
//     });
// };
