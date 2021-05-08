/* Inspired and modified on work from :
 https://github.com/LloydJanseVanRensburg/ShoppingCart-Redux/blob/starting_files/src/components/Cart/CartItem/CartItem.js
 */
import React from "react";
import styles from "./Cart.module.css";

import ListCard from "./ListCard/ListCard";

const CartComp = () => {
    return (
        <div className={styles.cart}>
            <div className={styles.cart__items}>
                <ListCard  />
                <ListCard />
                <ListCard />
            </div>
            <div className={styles.cart__summary}>
                <h4 className={styles.summary__title}>Cart Summary</h4>
                <div className={styles.summary__price}>
                    <span>TOTAL: (1 items)</span>
                    <span>$ 10.00</span>
                </div>
                <button className={styles.summary__checkoutBtn}>
                    Proceed To Checkout
                </button>
            </div>
        </div>
    );
};

export default CartComp;