const { products } = require("../products_array")

exports.index = function (req, res) {
    if (!products.length) return res.json({ error: "no hay productos cargados" })
    console.log(products)

    res.json(products)
}

exports.store = function (req, res) {
    const product = req.body
    let id = 1
    if (products.length) {
        id = products[products.length - 1].id + 1
    }
    products.push({ ...product, id: id, timestamp: new Date() })
    res.json({ status: "ok" })
}

exports.update = function (req, res) {
    const id = req.params.id
    const product = req.body

    products.map(p => {
        if (p.id == id) {
            p.timestamp = new Date()
            p.name = product.name
            p.description = product.description
            p.code = product.code
            p.picture = product.picture
            p.price = product.price
            p.stock = product.stock
        }
    })
    res.json(product)
}

exports.destroy = function (req, res) {
    const id = req.params.id
    const producto_eliminado = products.filter(p => p.id == id)
    const index = products.findIndex(p => p.id == id)

    if (index != -1) products.splice(index, 1)

    res.json(producto_eliminado)
}

exports.show = function (req, res) {
    const id = req.params.id

    let product = products.filter(e => e.id == id)
    if (!product.length) { product = { error: "producto no encontrado" } }

    res.json(product)
}