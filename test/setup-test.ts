import { createConnection, getConnectionOptions, Connection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { randomBytes } from "crypto";

const databaseName = `test_${randomBytes(8).toString("hex")}`;
let masterConn: Connection;
let connection: Connection;

export function setup() {
  beforeAll(async () => {
    try {
      masterConn = await createConnection({
        ...(await getConnectionOptions()),
        name: "master",
      });

      await masterConn.query(`CREATE DATABASE ${databaseName};`);

      connection = await createConnection({
        ...((await getConnectionOptions()) as PostgresConnectionOptions),
        database: databaseName,
        logging: false,
        migrationsRun: true,
      });
    } catch (err) {
      process.stderr.write(`${err}\n${err.stack || ""}\n`);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }
  });

  afterAll(async () => {
    await connection.close();
    await masterConn.query(`DROP DATABASE ${databaseName};`);
    await masterConn.close();
  });
}
