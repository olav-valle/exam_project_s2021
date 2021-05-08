import React from 'react';
import {useSelector} from "react-redux";
import {getCartContents} from "./cartSlice";

function CartComp() {
    const cart = useSelector(getCartContents);
    const cartList = cart.length > 0 ? cart.map(item => (
        <div className="h-28 w-1/2 bg-gray-500">
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.qty}</p>
        </div>
    )) : {};
    return (
        <div className="App">
            <h5>My cart</h5>
            <div>{cartList}</div>
        </div>
    );
}

export default CartComp;