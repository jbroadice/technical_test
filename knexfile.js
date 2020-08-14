require("dotenv").config();

module.exports = {
  client: "mysql2",
  useNullAsDefault: true,
  debug: true,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
  },
};
