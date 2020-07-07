const express = require("express");
const mongoose = require("./config/database");
const router = require("./config/routes");
const port = process.env.PORT || 3005;

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(port, () => {
    console.log("listening on port", port);
});