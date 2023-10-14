const config = {
  DB_HOST: 'ep-red-forest-08640491.us-west-2.aws.neon.tech',
  DB_PORT: 5432,
  DB_USER: 'chimichuflis',
  DB_NAME:'neondb',
  DB_PASSWORD:'C9dBo1Zblfhu',
  DB_SSL: "require"
}

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: config.DATABASE_URL,
    host: config["DB_HOST"],
    port: config["DB_PORT"],
    user: config["DB_USER"],
    database: config["DB_NAME"],
    password: config["DB_PASSWORD"],
    ssl: config["DB_SSL"] ? { rejectUnauthorized: false } : false,
  }
});

module.exports = knex;
