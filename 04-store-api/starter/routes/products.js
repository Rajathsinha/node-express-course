const express = require('express')
const router = express.Router()

const{ getAllProducts , getAllProductsStatic}= require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/testing').get(getAllProductsStatic)


module.exports = router