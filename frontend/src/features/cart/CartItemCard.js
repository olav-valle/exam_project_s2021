import {useDispatch, useSelector} from "react-redux";
import {itemQuantityChanged, itemRemovedFromCart, selectCartItemById} from "./cartSlice";
import React, {useState} from "react";


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
        <div className="mb-4 flex rounded-1g border-2 border-black ">
            <img
                className="w-50 object-contain rounded-3x1 "
                src={item.image}
                alt={item.title}
            />
            <div className="p-4 flex-col justify-between backdrop-grayscale">
                <p className="font-bold text-base">{item.name}</p>
                <p className="text-sm">{item.description}</p>
                <p className="text-base font-bold">$ {item.price}</p>
            </div>
            <div className="flex-col justify-around items-center p-2.5 ">
                <div className="flex items-center">
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


