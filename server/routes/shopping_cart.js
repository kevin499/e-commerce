const express = require('express')

const router_shopping_cart = express.Router()

const shoppingCartController = require('../controllers/shoppingCartController')


router_shopping_cart.get("", shoppingCartController.index)

router_shopping_cart.get("/:id", shoppingCartController.show)

router_shopping_cart.post("", shoppingCartController.store)

router_shopping_cart.put("/:id", shoppingCartController.update)

router_shopping_cart.delete("/:id", shoppingCartController.destroy)

module.exports = router_shopping_cart