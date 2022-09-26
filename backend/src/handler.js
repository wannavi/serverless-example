"use strict";

const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");

const binaryMimeTypes = [
  "application/javascript",
  "application/x-www-form-urlencoded",
  "application/json",
  "text/plain",
  "text/text",
];

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

module.exports.api = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
