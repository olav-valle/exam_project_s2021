import React from 'react';
import HeaderComp from "./features/header/HeaderComp";
import About from "./features/pages/About";
import Shop from "./features/pages/Shop";
import LoginComp from "./features/users/LoginComp";
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./features/pages/Home";
import Footer from "./features/header/Footer";

function App() {
  return (
      <Router>
    <div className="App">
      <HeaderComp />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/shop" component={Shop} />
        <Route path="/login" component={LoginComp} />
      </Switch>
      <Footer />
    </div>
      </Router>
  );
}

export default App;
