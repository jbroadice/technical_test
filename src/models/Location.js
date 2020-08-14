const BaseModel = require("./BaseModel");

class Location extends BaseModel {
  static get tableName() {
    return "locations";
  }
}

module.exports = Location;
