const Accounts = require("./accounts-model");
const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name && !budget) {
    next({ status: 400, message: "name and budget are required" });
  }
  if (typeof name !== "string") {
    next({ status: 400, message: "name of account must be a string" });
  }
  const trimmedName = name.trim().length;
  if (trimmedName < 3 || trimmedName > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  }
  if (typeof budget !== "number") {
    next({ status: 400, message: "budget of account muse be a number" });
  }
  if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  }
  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const existing = await db("account")
    .where("name", req.body.name.trim())
    .first();
  if (existing) {
    next({ status: 400, message: "that name is taken" });
  } else {
    next()
  }
};

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then((account) => {
      if (account) {
        req.account = account;
        next();
      } else {
        next({ status: 404, message: "account not found" });
      }
    })
    .catch(next);
};
