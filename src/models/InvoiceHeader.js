const BaseModel = require("./BaseModel");

class InvoiceHeader extends BaseModel {
  static get tableName() {
    return "invoice_headers";
  }

  static get relationMappings() {
    return {
      location: {
        relation: BaseModel.HasOneRelation,
        modelClass: "Location",
        join: {
          from: "invoice_headers.location_id",
          to: "locations.id",
        },
      },

      lines: {
        relation: BaseModel.HasManyRelation,
        modelClass: "InvoiceLine",
        join: {
          from: "invoice_headers.id",
          to: "invoice_lines.invoice_header_id",
        },
      },
    };
  }

  static get virtualAttributes() {
    return ["totalValue"];
  }

  get totalValue() {
    if (!this.lines) return null;

    let totalValue = 0;
    for (const i in this.lines) {
      totalValue += this.lines[i].value;
    }

    return totalValue;
  }
}

module.exports = InvoiceHeader;
