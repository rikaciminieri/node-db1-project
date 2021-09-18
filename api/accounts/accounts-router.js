const router = require("express").Router();
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
} = require("./accounts-middleware");
const Accounts = require("./accounts-model");

router.get("/", (req, res, next) => {
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    Accounts.create(req.body)
      .then((newAccount) => {
        res.status(201).json(newAccount);
      })
      .catch(next);
  }
);

router.put("/:id", checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then((updated) => {
      console.log("Hi");
      console.log(updated);
      res.status(200).json(updated);
    })
    .catch(next);
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then((deleted) => {
      res.status(200).json(req.account);
    })
    .catch(next);
});

module.exports = router;
