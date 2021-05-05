import React, { useState, useEffect } from 'react'

import { Modal, Button } from 'react-bootstrap'


const Producto = (props) => {

    const [producto, setProducto] = useState({})

    const [showEditar, setShowEditar] = useState(false);

    const handleClose = () => setShowEditar(false);
    const handleShow = () => setShowEditar(true);

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const productChanged = Object.fromEntries(formData)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productChanged)
        };
        fetch(`http://localhost:8080/api/productos/${producto.id || producto._id}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    handleClose()
                    props.updateProducts()
                }
            })
    }

    const deleteProduct = () => {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://localhost:8080/api/productos/${producto.id || producto._id}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log("se borró")
                    props.updateProducts()
                }
            })
    }

    useEffect(() => {

        setProducto(props.producto)

    }, [props.producto])

    return (
        <>
            <div className="card d-inline-block m-2" style={{ width: "18rem" }}>
                <img src={producto.picture} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">$ {producto.price}</h5>
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text">{producto.description}</p>
                    <a href="#" className="btn btn-sm btn-warning col-6" onClick={handleShow}>Editar</a>
                    <a href="#" className="btn btn-sm btn-danger col-6" onClick={deleteProduct}>X</a>
                </div>
            </div>

            <Modal show={showEditar} onHide={handleClose}>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <h1 className="text-muted mb-4">Editar Producto</h1>
                        <input className="form-control mt-2" type="text" name="name" placeholder="Nombre" defaultValue={producto.name} />
                        <input className="form-control mt-2" type="text" name="description" placeholder="Descripcion" defaultValue={producto.description} />
                        <input className="form-control mt-2" type="text" name="picture" placeholder="URL imagen" defaultValue={producto.picture} />
                        <input className="form-control mt-2" type="text" name="price" placeholder="Precio" defaultValue={producto.price} />
                        <input className="form-control mt-2" type="text" name="stock" placeholder="Stock" defaultValue={producto.stock} />
                        <button className="btn btn-warning col-12 mt-4" onClick={handleShow}>Editar</button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    )

}

export default Producto