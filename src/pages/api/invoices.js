import InvoiceHeader from "@models/InvoiceHeader";
import Location from "@models/Location";
import { INVOICE_STATUS_TYPES } from "appConstants";

export default async (req, res) => {
  require("@lib/db");

  // Init query
  const query = InvoiceHeader.query();

  // Filter query params
  const { statusType, locationId } = req.query;

  // Filter by status type
  if (
    typeof statusType !== "undefined" &&
    statusType.trim() &&
    INVOICE_STATUS_TYPES.includes(statusType)
  ) {
    query.where("status", statusType);
  }

  // Filter by location ID
  if (
    typeof locationId !== "undefined" &&
    locationId.trim() &&
    typeof (await Location.query().select("id").findById(locationId)) !== "undefined"
  ) {
    query.where("location_id", locationId);
  }

  // Execute query
  const invoices = await query.withGraphJoined("[lines, location]");

  // Respond
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ invoices }));
};
