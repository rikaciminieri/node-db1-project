const Accounts = require("./accounts-model");
const db = require("../../data/db-config");

const checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  console.log(name, budget)
  if (!name || !budget) {
    next({ status: 400, message: "name and budget are required" });
  } else if (typeof name !== "string") {
    next({ status: 400, message: "name of account must be a string" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number") {
    next({ status: 400, message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  } else {
    req.body.name = name.trim();
  }
  next();
};

const checkAccountNameUnique = async (req, res, next) => {
  try {
    console.log("in here")
    const existing = await db("account")
      .where("name", req.body.name.trim())
      .first();
      console.log(existing)
    if (existing) {
      next({ status: 400, message: "that name is taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then((account) => {
      if (!account) {
        // res.status(404).json({ message: "account not found" });
        next({ status: 404, message: "account not found" });
      } else {
        req.account = account;
        next();
      }
    })
    .catch(next);
};

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
};
