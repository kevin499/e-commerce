import React, { useState, useEffect } from "react";
import "./productoCarrito.css";

const Producto = (props) => {
  const [producto, setProducto] = useState({});

  useEffect(() => {
    setProducto(props.producto);
  }, [props.producto]);

  return (
    <>
      <div className="card mb-3 rounded">
        <div className="row m-0">
          <div className="col-md-4 d-flex p-0">
            <div className="card-shopping-cart">
              <img
                src={producto.picture}
                className="card-img-top "
                alt={producto.name}
              />
            </div>
          </div>
          <div className="col-md-8 p-0">
            <div className="card-body px-2">
              <p className="">{producto.name}</p>
              <p className="card-text text-wrap">
                <small className="badge bg-success text-wrap text-white">
                  $ {producto.price}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Producto;
