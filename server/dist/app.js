"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
console.log(process.env);
const app = express();
app.set("port", 3000);
app.use(bodyParser.json());
app.listen(app.get("port"), () => {
    console.log("App is running");
});
//# sourceMappingURL=app.js.map