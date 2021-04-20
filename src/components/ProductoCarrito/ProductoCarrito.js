import React, { useState, useEffect } from 'react'

import { Modal, Button } from 'react-bootstrap'


const Producto = (props) => {

    const [producto, setProducto] = useState({})

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
                    <p className="card-text">Cantidad seleccionada: <strong>{producto.quantity}</strong></p>

                </div>
            </div>
        </>
    )

}

export default Producto