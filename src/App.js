import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar/Navbar'
import ResultadoBusqueda from './components/ResultadoBusqueda/ResultadoBusqueda'
import Carrito from './components/Carrito/Carrito'



function App() {
  return (
    <>
      <Router>
      <Navbar></Navbar>

        <Switch>
          <Route exact path='/' component={ResultadoBusqueda}></Route>
        </Switch>
        <Carrito openShoppingCart={true}></Carrito>
      </Router>

    </>
  );
}

export default App;
