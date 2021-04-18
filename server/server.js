const express = require('express')

const app = express()

const router_product = express.Router()

const router_shopping_cart = express.Router()

const products_module = require('./products')

const shopping_cart_module = require('./shopping_cart')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', router_product)

router_product.get("",(req, res) => { 
    res.json(products_module.index())
})

router_product.get("/:id", (req, res) => {
    res.json(products_module.show(req.params.id))
})

router_product.post("", (req, res) => {
    res.json(products_module.store(req.body))
})

router_product.put("/:id", (req, res) => {
    res.json(products_module.update(req.params.id, req.body))
})

router_product.delete("/:id", (req, res) => {
    res.json(products_module.destroy(req.params.id))
})



app.use('/api/carrito', router_shopping_cart)

router_shopping_cart.get("",(req, res) => { 
    res.json(shopping_cart_module.index())
})

router_shopping_cart.get("/:id", (req, res) => {
    res.json(shopping_cart_module.show(req.params.id))
})

router_shopping_cart.post("", (req, res) => {
    res.json(shopping_cart_module.store(req.body))
})

router_shopping_cart.put("/:id", (req, res) => {
    res.json(shopping_cart_module.update(req.params.id, req.body))
})

router_shopping_cart.delete("/:id", (req, res) => {
    res.json(shopping_cart_module.destroy(req.params.id))
})



app.listen(process.env.port || 8080, () => {
    console.log("Running on 8080")
})