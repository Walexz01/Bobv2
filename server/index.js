require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const customers = require("./routes/customers");
const products = require("./routes/products");
const sales = require("./routes/sales");
const payments = require("./routes/payments");
const orders = require("./routes/orders");
const users = require("./routes/user");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/api/customers", customers);
app.use("/api/products", products);
app.use("/api/sales", sales);
app.use("/api/payments", payments);
app.use("/api/orders", orders);
app.use("/api/users", users);

const port = process.env.PORT | 500;

app.listen(port, () => console.log(`app listening on ${port}`));
