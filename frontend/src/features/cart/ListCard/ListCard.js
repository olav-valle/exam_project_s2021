/* Styles and structure based on work from
* https://github.com/LloydJanseVanRensburg/ShoppingCart-Redux/blob/starting_files/src/components/Cart/CartItem/CartItem.js
*      */
import React from 'react';
import styles from "./ListCard.module.css"

const ListCard = () => {
    return (
        <div className={styles.cartItem}>
            <img
                className={styles.cartItem__image}
               src="data:image/jpeg;base64,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"
            />
            <div className={styles.cartItem__details}>
                <p className={styles.details__title}>Title</p>
                <p className={styles.details__desc}>Description</p>
                <p className={styles.details__price}>$ 10.00</p>
            </div>
            <div className={styles.cartItem__actions}>
                <div className={styles.cartItem__qty}>
                    <label htmlFor="qty">Qty</label>
                    <input min="1" type="number" id="qty" name="qty" value="1" />
                </div>
                <button className={styles.actions__deleteItemBtn}>
                    <img
                        src="https://image.flaticon.com/icons/svg/709/709519.svg"
                        alt=""
                    />
                </button>
            </div>
        </div>
    )
}
export default ListCard;