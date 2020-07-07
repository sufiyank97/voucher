const express = require('express')
const router = express.Router()

const VouchersController = require('../app/controllers/VouchersController')


router.post('/voucher/create', VouchersController.create)


module.exports = router