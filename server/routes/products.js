const express = require('express')

const productController = require('../controllers/productController')

const router_product = express.Router()


router_product.get("/", productController.index)

router_product.post("/",  productController.store)

router_product.get("/:id",  productController.show)

router_product.put("/:id",  productController.update)

router_product.delete("/:id",  productController.destroy)

module.exports = router_product