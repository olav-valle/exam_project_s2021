import styles from "./Cart.module.css";
import React from "react";

const CartSummaryComp = ({totalQty, totalPrice}) => {


    return (<div
            className="
            flex flex-col justify-between p-4 shadow
            rounded
            bg-white
            h-36
            my-4
            ">
            <h4 className={styles.summary__title}>Cart Summary</h4>
            <div className={styles.summary__price}>
                <span>TOTAL: ( {totalQty} Items)</span>
                <span>$ {totalPrice}</span>
            </div>
            <button className={styles.summary__checkoutBtn}>
                Proceed To Checkout
            </button>
        </div>
    )
}

export default CartSummaryComp;