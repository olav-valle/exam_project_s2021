import {useDispatch, useSelector} from "react-redux";
import {itemQuantityChanged, selectCartItemById} from "./cartSlice";
import React, {useState} from "react";

const CartItemCard = ({itemId}) => {
    const item = useSelector(state => selectCartItemById(state, itemId))

    const dispatch = useDispatch();
    const onQtyChange = (e) => {
        dispatch(itemQuantityChanged(item.id, e.target.value));
    }
    return item ? (
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
    ) : null;

}

export default CartItemCard;