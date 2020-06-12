require("dotenv").config();

import { createServer, createServerOptions } from "xhelpers-api/lib/server";
const pkgJson = require("../package.json");

let server: any = {};
async function start() {
  const options: createServerOptions = {
    serverOptions: {
      port: process.env.PORT || 3000,
      host: process.env.HOST || "0.0.0.0",
    },
    options: {
      app_key_auth: process.env.APP_KEY_SECRET,
      swaggerOptions: {
        info: {
          title: pkgJson.description,
          version: pkgJson.version,
        },
        grouping: "tags",
      },
      routeOptions: {
        routes: "*/routes/*.js",
      },
      mongooseOptions: {
        connectionOptions: {
          dbName: process.env.APP_MONGO_DB_NAME,
        },
        uri: `mongodb://${process.env.APP_MONGO_USER}:${process.env.APP_MONGO_PASSWORD}@${process.env.APP_MONGO_HOST}:${process.env.APP_MONGO_PORT}/${process.env.APP_MONGO_DB_NAME}?authSource=admin`
      }
    },
  };
  server = await createServer(options);
  await server.start();
}
start();
