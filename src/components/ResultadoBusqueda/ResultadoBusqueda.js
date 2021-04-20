import React, { useState, useEffect } from 'react'

import { Modal, Button } from 'react-bootstrap'

import Producto from '../Producto/Producto'

const ResultadoBusqueda = () => {

    const [productos, setProductos] = useState([])

    const [showAddProduct, setShowAddProduct] = useState(false);

    const handleClose = () => setShowAddProduct(false);
    const handleShow = () => setShowAddProduct(true);

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const productChanged = Object.fromEntries(formData)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productChanged)
        };
        fetch(`http://localhost:8080/api/productos/`, requestOptions)
            .then(response => {
                if (response.ok) {
                    handleClose()
                    updateProducts()
                }
            })
    }

    const updateProducts = () => {
        fetch("http://localhost:8080/api/productos")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    return
                }
                setProductos([...data])
            })
    }

    useEffect(() => {
        updateProducts()
    }, [])

    return (
        <section className="p-4">
            <h2>Productos: </h2>
            <div className="d-block">
                <button type="button" className="btn btn-success btn-sm mt-4" onClick={handleShow}>Agregar</button>
            </div>
            {
                productos ? productos?.map((producto) => (
                    <Producto key={producto.id} producto={producto} updateProducts={updateProducts}></Producto>
                ))
                    : ''
            }


            <Modal show={showAddProduct} onHide={handleClose}>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <h1 className="text-muted mb-4">Agregar Producto</h1>
                        <input className="form-control mt-2" type="text" name="name" placeholder="Nombre" />
                        <input className="form-control mt-2" type="text" name="description" placeholder="Descripcion" />
                        <input className="form-control mt-2" type="text" name="picture" placeholder="URL imagen" />
                        <input className="form-control mt-2" type="text" name="price" placeholder="Precio" />
                        <input className="form-control mt-2" type="text" name="stock" placeholder="Stock" />
                        <button className="btn btn-success col-12 mt-4">Agregar</button>
                    </form>
                </Modal.Body>
            </Modal>
        </section>
    )

}

export default ResultadoBusqueda