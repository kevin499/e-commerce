const { shopping_carts } = require("../shopping_cart_array")
const { products } = require("../products_array")


exports.index = function (req, res) {
    if (!shopping_carts.length) res.json({ error: "no hay productos cargados en el carrito" })

    res.json(shopping_carts)
}

// exports.store = function (req, res) {
//     const shopping_cart = req.body
//     let id = 1
//     if (shopping_carts.length) {
//         id = shopping_carts[shopping_carts.length - 1].id + 1
//     }
//     shopping_carts.push({
//         id: id, timestamp: new Date(), product: {
//             ...shopping_cart
//         }
//     })
//     res.json( { status: "ok" } )
// }

exports.store = function (req, res) {
    const id = req.params.id
    const product = products.find(product => product.id == id)
    const code = product?.code
    if (!product) {
        return res.json({ error: "producto no encontrado" })
    }

    if (shopping_carts.find(product => product.id == id)) {
        shopping_carts.map(p => {
            if (p.id == id) {
                p.product.quantity += 1
            }
            else {
                return p
            }

        })
    }
    else {
        shopping_carts.push({
            id: id, timestamp: new Date(), product: {
                ...product,
                quantity: 1
            }
        })
    }



    res.json(product)
}

exports.destroy = function (req, res) {
    const id = req.params.id

    const shopping_cart = shopping_carts.filter(p => p.id == id)
    const index = shopping_carts.findIndex(p => p.id == id)

    if (index != -1) shopping_carts.splice(index, 1)

    res.json(shopping_cart)
}

exports.show = function (req, res) {
    const id = req.params.id
    let shopping_cart = shopping_carts.filter(e => e.id == id)
    if (!shopping_cart.length) { shopping_cart = { error: "No hay ningún producto en el carrito" } }

    res.json(shopping_cart)
}