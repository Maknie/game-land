const express = require("express");
const Earning = require("../models/earning");
require("dotenv").config();

const router = express.Router();

// Get Array of all Payments
router.get("/", async (req, res) => {
  try {
    const earnings = await Earning.find().sort({ createdAt: 1 });
    res.send(earnings);
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

//GET total income
router.get("/total", async (req, res) => {
  try {
    const earnings = await Earning.find();
    let totalIncome = 0;
    for (let i = 0; i < earnings.length; i++) {
      totalIncome = totalIncome + earnings[i].income;
    }
    res.send({
      total: totalIncome,
    });
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

// POST a new payment
router.post("/", (req, res) => {
  const earning = new Earning({
    name: req.body.name,
    income: req.body.income,
  });

  earning
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        message: err,
      });
    });
});

// DELETE all payments
router.post("/delete", (req, res) => {
  if (req.body.password.toString() === process.env.PASSWORD.toString()) {
    Earning.remove()
      .then((data) => {
        res.send({
            message: "Income is cleared"
        });
      })
      .catch((err) => {
        res.send({
          message: err,
        });
      });
  }else {
      res.send({
          message: "Password is incorrect"
      })
  }
});

module.exports = router;
