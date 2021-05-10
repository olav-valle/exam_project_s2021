import React, {useEffect} from 'react';

import ItemGrid from "./features/items/ItemGridComp";
import HeaderComp from "./features/header/HeaderComp";
import About from "./features/pages/About";
import LoginComp from "./features/users/LoginComp";
import itemDetails from "./features/items/ItemDetailComp";
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from "./features/header/Footer";
import CartComp from "./features/cart/CartComp";
import AdminPanelComp from "./features/Admin/AdminPanelComp";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemProgressStatus, fetchItems} from "./features/items/itemsSlice";

function App() {

  const dispatch = useDispatch();

  const fetchStatus = useSelector(fetchItemProgressStatus);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchItems());
    }
  },)

  return (
      <Router>
    <div className="App flex flex-col h-screen justify-between">
      <HeaderComp />
      <main className="flex-grow">
      <Switch>
        <Route path="/" exact component={ItemGrid} />
        <Route path="/about" component={About} />
        <Route path="/cart" component={CartComp} />
        <Route path="/login" component={LoginComp} />
        <Route path="/admin" component={AdminPanelComp}/>
        <Route path="/shop/product/:itemId" component={itemDetails} />
      </Switch>
      </main>
      <Footer />
    </div>
      </Router>
  );
}

export default App;
