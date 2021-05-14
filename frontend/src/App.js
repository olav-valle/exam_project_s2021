import React, {useEffect, useState} from 'react';

import ItemGrid from "./features/items/ItemGridComp";
import HeaderComp from "./features/header/HeaderComp";
import About from "./features/pages/About";
import itemDetails from "./features/items/ItemDetailComp";
import {BrowserRouter as Router, HashRouter, Route, Switch} from 'react-router-dom';
import Footer from "./features/header/Footer";
import CartComp from "./features/cart/CartComp";
import AdminPanelComp from "./features/Admin/AdminPanelComp";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemProgressStatus, fetchItems} from "./features/items/itemsSlice";
import LoginComp from "./features/users/LoginComp";

function App() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [userFetch, setUserFetch] = useState("idle");
    const dispatch = useDispatch();

    const fetchStatus = useSelector(fetchItemProgressStatus);

    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(fetchItems());
        }
    },)

    useEffect(async () => {
        if (userFetch === "idle") {
            try {
                let user = await fetch("/user")
                    .then(response => response.json());
                let isAdmin = user.authorities.some(a => a.authority === "ROLE_ADMIN");
                setIsAdmin(isAdmin);
            } catch (e) {
                throw e;
            }
        }
    })

    const getAdmin = async () => {
        let user = await fetch("/user")
            .then(response => response.json());
        let isAdmin = user.authorities.some(a => a.authority === "ROLE_ADMIN");
        return isAdmin;
    }

    return (
        <HashRouter>
            <div className="App flex flex-col h-screen justify-between">
                <HeaderComp/>
                <main className="flex-grow">
                    <Switch>
                        <Route path="/" exact component={ItemGrid}/>
                        <Route path="/about" component={About}/>
                        <Route path="/cart" component={CartComp}/>
                        <Route path="/admin" component={isAdmin ? AdminPanelComp : LoginComp}/>
                        <Route path="/shop/product/:itemId" component={itemDetails}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        </HashRouter>
    );
}

export default App;
