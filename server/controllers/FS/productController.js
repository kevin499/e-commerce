const fs = require('fs');
const { arch } = require('os');


module.exports = class productController {

    constructor(nombre_archivo) {
        this.nombre_archivo = nombre_archivo;
        if (!fs.existsSync(this.nombre_archivo)) fs.promises.writeFile(this.nombre_archivo, "[]");
    }

    index(req, res) {
        return fs.promises.readFile(this.nombre_archivo, 'utf-8')
            .then(resultado => {
                res.json(JSON.parse(resultado))
            })
            .catch(err => res.status(404).json(`No se encontró un archivo con ese nombre`))
    }

    async store(req, res) {


        const archivo_json = await fs.promises.readFile(this.nombre_archivo, 'utf-8')
            .then(resultado => JSON.parse(resultado))

        const producto = { id: archivo_json[archivo_json.length - 1]?.id + 1 || 1, ...req.body };

        archivo_json.push(producto);

        try {
            await fs.promises.writeFile(this.nombre_archivo, JSON.stringify(archivo_json));
            res.json({ status: "ok" })
        }
        catch (err) {
            res.sendStatus(500)
        }
    }

    async destroy(req, res) {

        const id = req.params.id

        const archivo_json = await fs.promises.readFile(this.nombre_archivo, 'utf-8')
        .then(resultado => JSON.parse(resultado))

        const producto = archivo_json.findIndex(n => n.id == id)

        if(producto == -1) res.json({ status: "El producto ya fue eliminado" })

        archivo_json.splice(producto, 1)

        try {
            await fs.promises.writeFile(this.nombre_archivo, JSON.stringify(archivo_json));
            res.json({ status: "ok" })
        }
        catch (err) {
            res.sendStatus(500)
        }

    }
}

