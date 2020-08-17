import Location from "@models/Location";

export default async (req, res) => {
  const knex = require("@lib/db");

  const { locationId } = req.query;

  res.setHeader("Content-Type", "application/json");

  if (!locationId) {
    res.statusCode = 422;
    res.end("No location ID given");
    return;
  }

  const location = await Location.query().findById(locationId);

  if (!location) {
    res.statusCode = 400;
    res.end("Invalid location ID");
    return;
  }

  const query = await knex.default.raw(
    `SELECT invoice_headers.status, SUM(invoice_lines.value) AS totalValue
    FROM invoice_headers LEFT JOIN invoice_lines ON invoice_headers.id = invoice_lines.invoice_header_id
    WHERE invoice_headers.location_id = ?
    GROUP BY invoice_headers.status`,
    [locationId],
  );

  const output = [];

  for (const i in query[0]) {
    query[0][i].totalValue = parseFloat(query[0][i].totalValue);
    output.push(query[0][i]);
  }

  res.statusCode = 200;
  res.end(JSON.stringify(output));
};
