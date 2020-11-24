require("dotenv").config();

import { createServer } from "xhelpers-api/lib/server";
const pkgJson = require("../package.json");

let server: any = {};
async function start() {
  const options: any = {
    serverOptions: {
      port: process.env.PORT || 3000,
      host: process.env.HOST || "0.0.0.0",
    },
    options: {
      jwt_secret: process.env.JWT_SECRET,
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
        uri: process.env.MONGODB_URI
      }
    },
  };
  server = await createServer(options);
  await server.start();
}
start();
