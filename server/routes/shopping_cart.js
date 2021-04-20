const express = require('express')

const { is_admin } = require("../middlewares/is_admin")

const shoppingCartController = require('../controllers/shoppingCartController')

const router_shopping_cart = express.Router()


router_shopping_cart.get("", shoppingCartController.index)

router_shopping_cart.get("/:id", shoppingCartController.show)

router_shopping_cart.post("", is_admin, shoppingCartController.store)

router_shopping_cart.put("/:id", is_admin, shoppingCartController.update)

router_shopping_cart.delete("/:id", is_admin, shoppingCartController.destroy)

module.exports = router_shopping_cart