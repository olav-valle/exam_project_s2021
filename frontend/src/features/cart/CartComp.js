import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getCartContents, itemQuantityChanged} from "./cartSlice";
import CartItemCard from "./CartItemCard";
import styles from "./Cart.module.css"

function CartComp()  {

    const cart = useSelector(getCartContents);
    const dispatch = useDispatch();

    const totalQty = cart.reduce(((accumulator, item) =>
        accumulator + item.qty ), 0);

    const totalPrice = cart.reduce((accumulator, item) =>
    accumulator + (item.price*item.qty), 0);

    const cartList = cart.length > 0 ? cart.map(item => (
        <CartItemCard itemId={item.id}/>
    )) : [];

    return (
        <div className={styles.cart}>
            <div className={styles.cart__items}>

                     {cartList}
            </div>



    <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Cart Summary</h4>
        <div className={styles.summary__price}>
            <span>TOTAL: ( {totalQty} Items)</span>
            <span>$ {totalPrice}</span>
        </div>
        <button className={styles.summary__checkoutBtn}>
            Proceed To Checkout
        </button>
    </div>
        </div>

    );
}

export default CartComp;


