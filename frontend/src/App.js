import React, {useEffect, useState} from 'react';

import ItemGrid from "./features/items/ItemGridComp";
import HeaderComp from "./features/header/HeaderComp";
import About from "./features/pages/About";
import itemDetails from "./features/items/ItemDetailComp";
import {BrowserRouter as Router, HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import Footer from "./features/header/Footer";
import CartComp from "./features/cart/CartComp";
import AdminPanelComp from "./features/Admin/AdminPanelComp";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemProgressStatus, fetchItems} from "./features/items/itemsSlice";
import LoginComp from "./features/users/LoginComp";
import {getCurrentUser} from "./app/client";
import {getUserRole, isUserTokenValid} from "./features/users/userSlice";
import {current} from "@reduxjs/toolkit";

function App() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [userFetch, setUserFetch] = useState("idle");
    const dispatch = useDispatch();

    const fetchStatus = useSelector(fetchItemProgressStatus);
    const currentUserRole = useSelector(getUserRole);

    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(fetchItems());
        }
    },)

    return (
        <HashRouter>
            <div className="App flex flex-col h-screen justify-between">
                <HeaderComp/>
                <main className="flex-grow">
                    <Switch>
                        <Route path="/" exact component={ItemGrid}/>
                        <Route path="/about" component={About}/>
                        <Route path="/cart" component={CartComp}/>
                        <Route path="/login" component={LoginComp}/>
                        <Route path="/admin"> {
                                ((currentUserRole === "ROLE_ADMIN"))
                            ?
                            <AdminPanelComp/> : <Redirect to="/login"/>
                        }

                        </Route>
                        <Route path="/shop/product/:itemId" component={itemDetails}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        </HashRouter>
    );
}

export default App;
