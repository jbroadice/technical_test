import Location from "@models/Location";

export default async (req, res) => {
  require("@lib/db");

  // Init query
  const query = Location.query();

  // Filter query params
  const { name } = req.query;

  // Filter by name
  if (typeof name !== "undefined") {
    query.where("name", "LIKE", `%${name}%`);
  }

  // Execute query
  const locations = await query.execute();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ locations }));
};
