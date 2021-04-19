const { shopping_carts } = require("../shopping_cart_array")

exports.index = function (req, res) {
    if (!shopping_carts.length) res.json( { error: "no hay productos cargados" } )

    res.json( shopping_carts )
}

exports.store = function (req, res) {
    const shopping_cart = req.body
    shopping_carts.push({
        id: shopping_carts[shopping_carts.length - 1].id + 1, timestamp: new Date(), product: {
            ...shopping_cart
        }
    })
    res.json( { status: "ok" } )
}

exports.update = function (req, res) {
    const id = req.params.id
    const shopping_cart = req.body

    shopping_carts.map(p => {
        if (p.id == id) {
            p.product.name= new Date()
            p.product.name = shopping_cart.name
            p.product.description = shopping_cart.description
            p.product.code = shopping_cart.code
            p.product.picture = shopping_cart.picture
            p.product.price = shopping_cart.price
            p.product.stock = shopping_cart.stock
        }
    })
    res.json( shopping_cart )
}

exports.destroy = function (req, res) {
    const id = req.params.id

    const producto_eliminado = shopping_carts.filter(p => p.id == id)
    const index = shopping_carts.findIndex(p => p.id == id)

    if (index != -1) shopping_carts.splice(index, 1)

    res.json( producto_eliminado )
}

exports.show = function (req, res) {
    const id = req.params.id
    let shopping_cart = shopping_carts.filter(e => e.id == id)
    if (!shopping_cart.length) { shopping_cart = { error: "No hay ningún producto en el carrito" } }

    res.json( shopping_cart )
}