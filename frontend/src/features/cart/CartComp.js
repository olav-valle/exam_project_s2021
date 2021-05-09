import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getCartContents, itemQuantityChanged} from "./cartSlice";
import CartItemCard from "./CartItemCard";

function CartComp() {
    const cart = useSelector(getCartContents);
    const dispatch = useDispatch();
    const onQtyChange = (e, id) => {
        // setQty(e.target.value);
        dispatch(itemQuantityChanged(id, e.target.value));
    }
    const cartList = cart.length > 0 ? cart.map(item => (
        <CartItemCard itemId={item.id}/>
    )) : [];
    return (
        <div className="App ">
            <h5>My cart</h5>
            <div className="flex flex-col items-center  mx-auto">{cartList}</div>
        </div>
    );
}

export default CartComp;