const express = require("express");
const Customer = require("../models/customer");
const plansConst = require("../config/consts");

const router = express.Router();

// Get Array of all Customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ exitTime: 1 });
    res.send(customers);
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

router.get("/today", async (req, res) => {
  try {
    let forCurrentDay = new Date();
    forCurrentDay.toUTCString();
    forCurrentDay.setHours(0);
    const customers = await Customer
    .find({ date: { $gte: forCurrentDay }})
    .sort({ exitTime: 1 });
    res.send(customers);
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

// Get total earnings Customers
router.get("/total", async (req, res) => {
  try {
    let today = new Date();
    today.toUTCString();
    let forCurrentDay = new Date(today);
    let forCurrentWeek = new Date(today);
    let forPrevMonth = new Date(today);
    forCurrentDay.setDate(today.getDate());
    forCurrentWeek.setDate(today.getDate() - 7);
    forPrevMonth.setMonth(today.getMonth() - 1);
    forCurrentDay.setHours(00);
    forCurrentWeek.setHours(00);
    forPrevMonth.setHours(00);

    const getEarnings = (elementsArray) => {
      let earnings = 0;
      for (let i = 0; i < elementsArray.length; i++) {
        earnings = earnings + elementsArray[i].price;
      }
      return earnings;
    };

    const customersForLastDay = await Customer.find({
      date: { $gte: forCurrentDay },
    });
    const customersForLastWeek = await Customer.find({
      date: { $gte: forCurrentWeek },
    });
    const customersForLastMonth = await Customer.find({
      date: { $gte: forPrevMonth },
    });
    res.send({
      earningsTodayDay: getEarnings(customersForLastDay),
      earningsThisWeek: getEarnings(customersForLastWeek),
      earningsPrevMonth: getEarnings(customersForLastMonth),
    });
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

// Get Array of specific Customers by plan
router.get("/:customerPlan", async (req, res) => {
  try {
    const customer = await Customer.find({
      plan: req.params.customerPlan,
    }).sort({ exitTime: 1 });
    res.send(customer);
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

// Creating new customer
// In request needed only "name", "givenID", "parentsPhone", "plan"
router.post("/", (req, res) => {
  const getTwoDigitedTime = (hours, minutes, seconds) => {
    if (-1 < hours && hours < 10) {
      hours = "0" + hours;
    }
    if (-1 < minutes && minutes < 10) {
      minutes = "0" + minutes;
    }
    if (-1 < seconds && seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds + "";
  };

  const exitTimeCalculate = (plan) => {
    if (plan === plansConst.MIN_30) {
      let now = new Date();
      now.setMinutes(now.getMinutes() + 30);
      return getTwoDigitedTime(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
    } else if (plan === plansConst.HOUR_1) {
      let now = new Date();
      now.setHours(now.getHours() + 1);
      return getTwoDigitedTime(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
    } else if (plan === plansConst.UNLIMIT) {
      return plansConst.UNLIMIT;
    }
  };
  const priceCalculate = (plan) => {
    if (plan === plansConst.MIN_30) {
      return plansConst.MIN_30_PRICE;
    } else if (plan === plansConst.HOUR_1) {
      return plansConst.HOUR_1_PRICE;
    } else if (plan === plansConst.UNLIMIT) {
      return plansConst.UNLIMIT_PRICE;
    }
  };

  const currentDate = () => {
    let today = new Date();
    today.toUTCString();
    return today;
  };

  const customer = new Customer({
    name: req.body.name,
    givenId: req.body.givenId,
    parentsPhone: req.body.parentsPhone,
    plan: req.body.plan,
    price: priceCalculate(req.body.plan),
    enterTime: new Date().toLocaleTimeString(),
    exitTime: exitTimeCalculate(req.body.plan),
    date: currentDate(),
  });

  customer
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

// When time is up
router.patch("/timeout/:customerId", async (req, res) => {
  try {
    const timedOutCustomer = await Customer.updateOne(
      { _id: req.params.customerId },
      { $set: { isTimedOut: true } }
    );
    res.json(timedOutCustomer);
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

module.exports = router;
