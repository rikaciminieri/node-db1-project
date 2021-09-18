const router = require("express").Router();
const {checkAccountPayload, checkAccountId, checkAccountNameUnique} = require('./accounts-middleware')
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
    console.log("HERE")
    Accounts.create(req.body)
      .then((newAccount) => {
        res.status(201).json(newAccount);
      })
      .catch(next);
  }
);

router.put("/:id", checkAccountId, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then((updatedAccount) => {
      res.status(200).json(updatedAccount);
    })
    .catch(next);
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then(deleted => {
    res.status(204)
  })
  .catch(next)
});


module.exports = router;
