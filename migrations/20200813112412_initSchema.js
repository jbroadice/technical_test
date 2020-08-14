const fs = require("fs");

exports.up = async function (knex) {
  const sql = fs.readFileSync("./dump/base.sql").toString();

  await knex.raw(sql);

  // invoice_lines should have id column as auto incrementing
  await knex.raw(
    "ALTER TABLE `invoice_lines` CHANGE `id` `id` INT(10)  UNSIGNED  NOT NULL  AUTO_INCREMENT;",
  );
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("invoice_lines");
  await knex.schema.dropTableIfExists("invoice_headers");
  await knex.schema.dropTableIfExists("locations");
};
