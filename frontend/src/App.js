import React from 'react';
import ItemGrid from "./features/items/ItemGridComp";
import HeaderComp from "./features/header/HeaderComp";
import About from "./features/pages/About";
import LoginComp from "./features/users/LoginComp";
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from "./features/header/Footer";
import CartComp from "./features/cart/CartComp";

function App() {
  return (
      <Router>
    <div className="App">
      <HeaderComp />
      <Switch>
        <Route path="/" exact component={ItemGrid} />
        <Route path="/about" component={About} />
        <Route path="/cart" component={CartComp} />
        <Route path="/login" component={LoginComp} />
      </Switch>
      <Footer />
    </div>
      </Router>
  );
}

export default App;
