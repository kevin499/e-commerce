const express = require('express')

const { is_admin } = require("../middlewares/is_admin")

const productController = require('../controllers/productController')

const router_product = express.Router()


router_product.get("/",productController.index)

router_product.post("/", is_admin, productController.store)

router_product.get("/:id", productController.show)

router_product.put("/:id", is_admin, productController.update)

router_product.delete("/:id", is_admin, productController.destroy)

module.exports = router_product