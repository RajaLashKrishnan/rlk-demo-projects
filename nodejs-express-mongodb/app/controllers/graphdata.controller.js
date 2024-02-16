const db = require("../models");
const GraphData = db.graphdata;

// Create and Save a new GraphData
exports.create = (req, res) => {
  // Validate request
  if (!req.body.graphdataName) {
    res.status(400).send({ message: "Content can not be EEMMPPTY!" });
    return;
  }

  // Create a GraphData
  // {
  //   name: String,
  //   accountype: String,
  //   occupation: String,
  //   balance: String,
  //   status: String
  // },

  const graphdata = new GraphData({
    graphdataName: req.body.graphdataName,
    accountType: req.body.accountType,
    occupation: req.body.occupation,
    balance: req.body.balance,
    status: req.body.status
  });

  // Save GraphData in the database
  graphdata
    .save(graphdata)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the GraphData."
      });
    });
};

// Retrieve all GraphData from the database.
exports.findAll = (req, res) => {
  const requestType = req.query.requestType;
  var condition = requestType ? { requestType: { $regex: new RegExp(requestType), $options: "i" } } : {};

  GraphData.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving graphdata."
      });
    });
};

// Delete all GraphData from the database.
exports.deleteAll = (req, res) => {
  GraphData.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} GraphData were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all graphdata."
      });
    });
};
