const productController = require("../controllers/FS/productController")

module.exports = class mariaDB{
    connect(controller){
        console.log("Conectado a FileSystem...")
        // this.db = 
        this.controller = new productController("prueba.txt")
    }
    index(req, res){
        this.controller.index(req, res)
    }
    store(req, res){
        this.controller.store(req, res)
    }
    show(req, res){
        this.controller.show(req, res)
    }
    update(req, res){
        this.controller.update(req, res)
    }
    destroy(req, res){
        this.controller.destroy(req, res)
    }
}