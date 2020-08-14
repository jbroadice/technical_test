const { Model } = require("objection");
const knexConfig = require("../../knexfile");
const Knex = require("knex");

// Initialize knex.
const knex = Knex(knexConfig);

// Give the knex instance to objection.
Model.knex(knex);

export default knex;
