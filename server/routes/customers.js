const express = require("express");
const router = express.Router();
const validate = require("../middleware/authMiddleware");
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getTopCustomer,
} = require("../data/customers");

//  routes to get the list of customers by calling the getCustomers function that was exported from the subfolder of data called  customer

router.get("/", async (req, res) => {
  const result = await getCustomers();
  res.send(result);
});

router.get("/top", async (req, res) => {
  const result = await getTopCustomer();
  res.send(result);
});

//  routes to get the  customer by calling the getCustomer function that was exported from the subfolder of data called  customer with the name been passed as an params

router.get("/:name", async (req, res) => {
  const result = await getCustomer(req.params.name);
  res.send(result);
});

//  routes to post the  customer by calling the createCustomer function that was exported from the subfolder of data called  customer and passing the require values in the request body

router.post("/", async (req, res) => {
  let { name, address } = req.body;
  const result = await createCustomer(name, address);
  res.send(result);
});

//  routes to update the  customer by calling the createCustomer function that was exported from the subfolder of data called  customer and passing the require values in the request body

router.put("/:name", async (req, res) => {
  let { new_name, address } = req.body;
  let name = req.params.name;
  const result = await updateCustomer(new_name, address, name);
  res.send("successful");
});

router.delete("/:name", async (req, res) => {
  deleteCustomer(req.params.name);
  res.send("successful");
});

module.exports = router;
