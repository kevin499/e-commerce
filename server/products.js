const { products } = require("./products_array")

exports.index = function () {
    if (!products.length) return { error: "no hay productos cargados" }

    return products
}

exports.store = function (product) {
    products.push({ ...product, id: products[products.length - 1].id + 1 , timestamp: new Date()})
    return { status: "ok" }
}

exports.update = function (id, product) {
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
    return product
}

exports.destroy = function (id) {

    const producto_eliminado = products.filter(p => p.id == id)
    const index = products.findIndex(p => p.id == id)
    
    if (index != -1) products.splice(index, 1)

    return producto_eliminado
}

exports.show = function (id) {
    let product = products.filter(e => e.id == id)
    if (!product.length) { product = { error: "producto no encontrado" } }

    return product
}