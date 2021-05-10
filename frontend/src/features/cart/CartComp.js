import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCartContents} from "./cartSlice";
import CartItemCard from "./CartItemCard";
import CartSummaryComp from "./CartSummaryComp";

function CartComp() {

    const cart = useSelector(getCartContents);
    const dispatch = useDispatch();

    const totalQty = cart.reduce(((accumulator, item) =>
        accumulator + item.qty), 0);

    const totalPrice = cart.reduce((accumulator, item) =>
        accumulator + (item.price * item.qty), 0);

    const cartList = cart.length > 0 ? cart.map(item => (
        <CartItemCard key={item.id} itemId={item.id}/>
    )) : [];

    return (

        <div className="relative flex flex-col items-center md:flex-row md:items-start md:justify-center mx-auto">
            <div className="flex flex-col justify-center max-w-min mx-4">
                {cartList}
            </div>
            <CartSummaryComp totalPrice={totalPrice} totalQty={totalQty}/>

        </div>


    );
};

export default CartComp;


