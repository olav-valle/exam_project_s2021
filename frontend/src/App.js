import React from 'react';

import ItemGrid from "./features/items/ItemGridComp";

import HeaderComp from "./features/header/HeaderComp";
import About from "./features/pages/About";
import Shop from "./features/pages/Shop";
import LoginComp from "./features/users/LoginComp";
import itemDetails from "./features/items/ItemDetailComp";
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./features/pages/Home";
import Footer from "./features/header/Footer";
import CartComp from "./features/cart/CartComp";

function App() {
  return (
      <Router>
    <div className="App mb-16">
      <HeaderComp />
      <Switch>
        <Route path="/" exact component={ItemGrid} />
        <Route path="/about" component={About} />
        <Route path="/cart" component={CartComp} />
        <Route path="/login" component={LoginComp} />
        <Route path="/shop/product/:itemId" component={itemDetails} />

      </Switch>
      <Footer />
    </div>
      </Router>
  );
}

export default App;
