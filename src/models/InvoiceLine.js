const BaseModel = require("./BaseModel");

class InvoiceLine extends BaseModel {
  static get tableName() {
    return "invoice_lines";
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);

    return {
      ...json,
      value: parseFloat(json.value),
    };
  }
}

module.exports = InvoiceLine;
