const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.pclrequests = require("./pclrequest.model.js")(mongoose);
db.customers = require("./customer.model.js")(mongoose);
db.relations = require("./relation.model.js")(mongoose);
db.graphdata = require("./graphdata.model.js")(mongoose);
db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;
