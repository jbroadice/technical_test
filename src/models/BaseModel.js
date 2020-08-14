const { Model } = require("objection");

class BaseModel extends Model {
  static get modelPaths() {
    return ["src/models/"];
  }
}

module.exports = BaseModel;
