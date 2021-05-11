import React, { useState, useEffect } from 'react'

import { Modal } from 'react-bootstrap'

import Producto from '../Producto/Producto'

const ResultadoBusqueda = () => {

    const [productos, setProductos] = useState([])

    const initialState = {
        name: '',
        description: '',
        picture: '',
        price: '',
        stock: ''
    }

    const [form, setForm] = useState(initialState)


    const [showAddProduct, setShowAddProduct] = useState(false);

    const handleClose = () => setShowAddProduct(false);
    const handleShow = () => setShowAddProduct(true);

    const handleSubmit = (e) => {
        e.preventDefault()

        // const formData = new FormData(e.target);
        // const productChanged = Object.fromEntries(formData)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };
        fetch(`http://localhost:8080/api/productos/`, requestOptions)
            .then(response => {
                if (response.ok) {
                    cleanState()
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

    const handleInputChange = ({ target }) => {
        const is_number = ["price", "stock"].indexOf(target.name) > -1
        setForm(state => ({ ...state, [target.name]: is_number ? target.valueAsNumber : target.value }))
    }

    const cleanState = _ => setForm({ ...initialState })

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
                    <Producto key={producto.id || producto._id} producto={producto} updateProducts={updateProducts}></Producto>
                ))
                    : ''
            }


            <Modal show={showAddProduct} onHide={handleClose}>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <h1 className="text-muted mb-4">Agregar Producto</h1>
                        <input className="form-control mt-2" type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="Nombre" />
                        <input className="form-control mt-2" type="text" name="description" value={form.description} onChange={handleInputChange} placeholder="Descripcion" />
                        <input className="form-control mt-2" type="text" name="picture" value={form.picture} onChange={handleInputChange} placeholder="URL imagen" />
                        <input className="form-control mt-2" type="number" name="price" value={form.price} onChange={handleInputChange} placeholder="Precio" />
                        <input className="form-control mt-2" type="number" name="stock" value={form.stock} onChange={handleInputChange} placeholder="Stock" />
                        <button className="btn btn-success col-12 mt-4">Agregar</button>
                    </form>
                    
                </Modal.Body>
            </Modal>
        </section>
    )

}

export default ResultadoBusqueda