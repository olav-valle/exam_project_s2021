import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getCartContents, itemQuantityChanged} from "./cartSlice";
import CartItemCard from "./CartItemCard";
import styles from "./Cart.module.css"

function CartComp()  {

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
        <div className={styles.cart}>
            <div className={styles.cart__items}>

                     {cartList}
            </div>



    <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Cart Summary</h4>
        <div className={styles.summary__price}>
            <span>TOTAL: ( Items)</span>
            <span>$ 10</span>
        </div>
        <button className={styles.summary__checkoutBtn}>
            Proceed To Checkout
        </button>
    </div>
        </div>

    );
}

export default CartComp;


