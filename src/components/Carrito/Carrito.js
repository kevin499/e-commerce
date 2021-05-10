import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showShoppingCart } from '../../store/ui/actions';

import './carrito.css'

import ProductoCarrito from '../ProductoCarrito/ProductoCarrito'

const Carrito = (props) => {

    const [carrito, setCarrito] = useState([])

    const dispatch = useDispatch()

    const show = useSelector (state => state.SHOW_SHOPPING_CART)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const productChanged = Object.fromEntries(formData)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productChanged)
        };
        fetch(`http://localhost:8080/api/carrito/${e.target.id.value}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    updateShoppingCart()
                }
            })
    }

    const updateShoppingCart = () => {
        fetch("/api/carrito")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    return
                }
                setCarrito(data)
            })
    }

    useEffect(() => {
        updateShoppingCart()
    }, [])

    return (
        <section className={`carrito  ${show && 'open-shopping-cart'}`}>
            <a href="javascript:void(0)" class="closebtn" onClick={() => dispatch(showShoppingCart(false))} >&times;</a>
            <h2>Carrito: </h2>
            <div className="d-block">

                <form className="mb-3" onSubmit={handleSubmit}>
                    <p>Agregar al carrito</p>
                    <div className="d-flex">
                        <input type="text" name="id" placeholder="ID del producto" />
                        <button className="btn btn-success btn-sm">Agregar</button>
                    </div>

                </form>
            </div>

            {
                carrito ? carrito?.map((item) => (
                    <ProductoCarrito key={item.id} producto={item.product || item} updateProducts={updateShoppingCart}></ProductoCarrito>
                ))
                    : ''
            }

        </section>
    )

}

export default Carrito