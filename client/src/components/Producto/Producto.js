import React, { useState, useEffect } from "react";
import "./producto.css";

import { Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Producto = (props) => {
  const [producto, setProducto] = useState({});
  const [showEditar, setShowEditar] = useState(false);

  const handleClose = () => setShowEditar(false);
  const handleShow = () => setShowEditar(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    };
    fetch(
      `http://localhost:8080/api/productos/${producto.id || producto._id}`,
      requestOptions
    ).then((response) => {
      if (response.ok) {
        handleClose();
        props.updateProducts();
      }
    });
  };

  const deleteProduct = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:8080/api/productos/${producto.id || producto._id}`,
      requestOptions
    ).then((response) => {
      if (response.ok) {
        console.log("se borró");
        props.updateProducts();
      }
    });
  };

  const addToCart = () => {
    const id = producto.id || producto._id;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:8080/api/carrito/${id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          // dispatchEvent
        }
      }
    );
  };

  const handleInputChange = ({ target }) => {
    const is_number = ["price", "stock"].indexOf(target.name) > -1;
    setProducto((state) => ({
      ...state,
      [target.name]: is_number ? target.valueAsNumber : target.value,
    }));
  };

  useEffect(() => {
    setProducto(props.producto);
  }, [props.producto]);

  useEffect(() => {
    console.log(producto);
  }, [producto]);

  return (
    <>
      <div
        className="position-relative card d-inline-block m-2"
        style={{ width: "18rem" }}
      >
        <img
          src={producto.picture}
          className="card-img-top"
          alt={producto.name}
        />
        <div className="card-body">
          <h5 className="card-title">$ {producto.price}</h5>
          <h5 className="card-title">{producto.name}</h5>
          <p className="card-text">{producto.description}</p>
          <button
            type="button"
            className="btn btn-sm btn-warning col-6"
            onClick={handleShow}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger col-6"
            onClick={deleteProduct}
          >
            X
          </button>
          <button
            type="button"
            className="btn btn-sm btn-success shopping-cart"
            onClick={addToCart}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>

      <Modal show={showEditar} onHide={handleClose}>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <h1 className="text-muted mb-4">Editar Producto</h1>
            <input
              className="form-control mt-2"
              type="text"
              name="name"
              placeholder="Nombre"
              defaultValue={producto.name}
              onChange={handleInputChange}
            />
            <input
              className="form-control mt-2"
              type="text"
              name="description"
              placeholder="Descripcion"
              defaultValue={producto.description}
              onChange={handleInputChange}
            />
            <input
              className="form-control mt-2"
              type="text"
              name="picture"
              placeholder="URL imagen"
              defaultValue={producto.picture}
              onChange={handleInputChange}
            />
            <input
              className="form-control mt-2"
              type="number"
              name="price"
              placeholder="Precio"
              defaultValue={producto.price}
              onChange={handleInputChange}
            />
            <input
              className="form-control mt-2"
              type="number"
              name="stock"
              placeholder="Stock"
              defaultValue={producto.stock}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-warning col-12 mt-4"
              onClick={handleShow}
            >
              Editar
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Producto;
