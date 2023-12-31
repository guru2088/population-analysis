import { Express } from "express";
import * as promClient from "prom-client";
import { requestWatch, reset } from "./mw";
const pkg = require("../../package.json");
export function init(app: Express) {
  promClient.register.setDefaultLabels({
    app: pkg.name,
    version: pkg.version
  });
  promClient.collectDefaultMetrics({ timeout: 30000 });
  app.get("/metrics", (req, res) => {
    res.end(promClient.register.metrics());
    reset();
  });
  app.use(requestWatch);
}
