const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const bodyParser = require("body-parser")
const cors = require("cors")
const CustomerRoute = require("./routes/customers")
const EarningRoute = require("./routes/earnings")

// Express
const app = express();

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use('/customers', CustomerRoute)
app.use('/earnings', EarningRoute)

// Conection to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("You are now connected to Mongo!"))
  .catch((err) => console.error("Something went wrong", err));

// Running app on PORT
app.listen(PORT);


















// const customerSchema = new mongoose.Schema({
//   name: String,
//   givenId: Number,
//   parentsPhone: String,
//   enterTime: {
//     type: Date,
//     default: Date.now,
//   },
//   isTimedOut: Boolean,
//   plan: String,
//   price: Number,
// });

// const Customer = mongoose.model("Customer", customerSchema);

// async function saveCustomer() {
//   const customer = new Customer({
//     name: "Alex",
//     givenId: 10,
//     parentsPhone: "87008008080",
//     isTimedOut: false,
//     plan: "1 hour",
//     price: 1000,
//   });

//   const result = await customer.save();
//   console.log(result);
// }

// saveCustomer();

// async function getCustomers() {
//     const customers = await Customer.find();
//     console.log(customers);
// }
 
// getCustomers();