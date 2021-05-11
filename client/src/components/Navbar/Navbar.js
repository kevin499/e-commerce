import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showShoppingCart } from "../../store/ui/actions";

const Navbar = () => {
  const dispatch = useDispatch();

  const openShoppingCart = () => {
    dispatch(showShoppingCart(true));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-brand btn btn-link">E-commerce</button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={openShoppingCart}
                >
                  Carrito
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
