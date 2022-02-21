const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {getRanDom}= require('../db/Puzzle/index')

/* GET home page. */
router.get('/', getRanDom);

module.exports = router;
