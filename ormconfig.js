const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE } = process.env;

module.exports = {
  type: "postgres",
  database: DATABASE,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  logging: true,
  cli: {
    migrationsDir: "src/migrations"
  },
  entities: ["src/models/*.{js,ts}"],
  migrations: ["src/migrations/*.{js,ts}"],
  namingStrategy: new SnakeNamingStrategy(),
  ssl: false,
};
