import { config } from "dotenv";
import { resolve } from "path";
import { createServer } from "http";
import { createConnection, getConnectionOptions } from "typeorm";
import app from "./app";

const server = createServer(app);

config({ path: resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 9999;

getConnectionOptions()
  .then(async options => {
    return createConnection({
      ...options,
      migrationsRun: true,
    }).then(() => {
      server.listen(PORT, () => console.log(`running on port ${PORT}`));
    });
  })
  .catch(error => {
    console.log({ startServerError: error });
  });
