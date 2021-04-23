const { options } = require("../options/mariaDB")

const knex = require('knex')(options)


exports.index = function (req, res) {

    knex('products')
        .then(rows => {
            if (!rows.length) return res.json({ error: "no hay productos cargados" })
            res.json(rows)
        })
        .catch(() => {
            res.sendStatus(500)
        })


}

exports.store = function (req, res) {
    const product = req.body
    knex('products')
        .insert(product)
        .then(_ => {
            res.json({ status: "ok" })
        })
        .catch(_ => {
            res.sendStatus(500)
        })
}

exports.update = function (req, res) {
    const id = req.params.id
    const product = req.body

    knex('products')
        .where({ id: id })
        .update(product)
        .then(_ => {
            res.json(product)
        })
        .catch(_ => {
            res.sendStatus(500)
        })

}

exports.destroy = function (req, res) {
    const id = req.params.id

    knex('products')
        .where({ id: id })
        .del()
        .then(_ => {
            res.json({ status: "ok" })
        })
        .catch(_ => {
            res.sendStatus(500)
        })
}

exports.show = function (req, res) {
    const id = req.params.id

    knex('products')
    .where({ id: id })
    .then(rows => {
        if (!rows.length) return res.json({ error: "no se encontró el producto" })
        res.json(rows)
    })
    .catch(() => {
        res.sendStatus(500)
    })
}