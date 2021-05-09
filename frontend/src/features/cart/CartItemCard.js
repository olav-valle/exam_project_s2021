import {useDispatch, useSelector} from "react-redux";
import {itemQuantityChanged, itemRemovedFromCart, selectCartItemById} from "./cartSlice";
import React, {useState} from "react";
import styles from "./CartItem.module.css";

const CartItemCard = ({itemId}) => {
    const item = useSelector(state => selectCartItemById(state, itemId))

    const dispatch = useDispatch();

    const onQtyChange = (e) => {
        dispatch(itemQuantityChanged(item.id, e.target.value));
    }

    const onDelete = () => {
        dispatch(itemRemovedFromCart(item.id))
    }

    return item ? (
        <div className={styles.cartItem}>
            <img
                className={styles.cartItem__image}
                src={item.image}
                alt={item.title}
            />
            <div className={styles.cartItem__details}>
                <p className={styles.details__title}>{item.name}</p>
                <p className={styles.details__desc}>{item.description}</p>
                <p className={styles.details__price}>$ {item.price}</p>
            </div>
            <div className={styles.cartItem__actions}>
                <div className={styles.cartItem__qty}>
                    <label>Quantity: </label>
                    <input
                        value={item.qty}
                        min="0"
                        type="number"
                        onChange={onQtyChange}/>
                </div>
                <button
                    onClick={onDelete}
                    className="w-9"
                >
                    <img
                        src="https://image.flaticon.com/icons/svg/709/709519.svg"
                        alt=""
                    />
                </button>
            </div>
        </div>

    ) : null;

}

export default CartItemCard;


/*
    <div className="flex flex-row items-center justify-between h-28 w-1/2 bg-grey my-1">
        <p>{item.name}</p>
        <p>{item.description}</p>
        <div>
            <label>Quantity: </label>
            <input className="border w-10"
                   value={item.qty}
                   min="0"
                   type="number"
                   onChange={onQtyChange}/>
        </div>
    </div>

*/