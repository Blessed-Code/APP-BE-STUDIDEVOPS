const express = require("express");
const router = express.Router();

router.use(`${process.env.API_PREFIX}/posts`, require("./post.route"));

module.exports = router;