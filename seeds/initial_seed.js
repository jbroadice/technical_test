const faker = require("faker");
const { Model } = require("objection");
const Location = require("../src/models/Location");
const InvoiceHeader = require("../src/models/InvoiceHeader");

exports.seed = async function (knex) {
  Model.knex(knex);

  // Deletes ALL existing entries
  await knex("invoice_headers").del();
  await knex("invoice_lines").del();
  await knex("locations").del();

  // Insert locations
  let locations = [];

  for (let i = 0; i < 10; i++) {
    locations.push({ name: faker.address.city() });
  }

  const insertedLocations = await Location.query().insertGraph(locations);

  const locationIdsRange = [
    insertedLocations[0].id,
    insertedLocations[insertedLocations.length - 1].id,
  ];

  // Insert invoice headers
  let invoiceHeaders = [];

  for (let i = 0; i < 250; i++) {
    let invoiceLines = [];
    for (let j = 0; j < 5; j++) {
      invoiceLines.push({
        description: faker.commerce.productDescription(),
        value: faker.random.float({ min: 0, max: 150 }),
      });
    }

    invoiceHeaders.push({
      location_id: faker.random.number({
        min: locationIdsRange[0],
        max: locationIdsRange[1],
      }),
      date: faker.date.recent(365),
      status: faker.random.arrayElement(["draft", "open", "processed"]),
      lines: invoiceLines,
    });
  }

  await InvoiceHeader.query().insertGraph(invoiceHeaders);
};
