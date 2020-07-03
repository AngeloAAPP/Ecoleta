const express = require('express')
const router = express.Router();
const {index} = require('../controllers/itensController')

router.get('/', index)

module.exports = router;