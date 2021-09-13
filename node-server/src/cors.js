const express = require("express");
const router = express.Router();

module.exports = router.use(function (req, res, next) {
  res.header("Access-Control-Expose-Headers", "session-token");
  next();
});
