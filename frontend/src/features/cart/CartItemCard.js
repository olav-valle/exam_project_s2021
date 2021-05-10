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
        <div className="my-4 flex flex-row rounded shadow min-w-max">
            <img
                className="w-36 object-contain rounded"
                src="https://devducks.com/static/devducks/imgs/linux-duck.jpg"
                alt="This should really be a rubber penguin, I feel..."
            />

            <div className="flex p-4 flex-grow-1 flex-col items-start w-full justify-between backdrop-grayscale">
                <p className="font-bold text-base">{item.name}</p>
                <p className="text-sm">{item.description}</p>
                <p className="text-base font-bold">$ {item.price}</p>
            </div>

            <div className="flex flex-row justify-between items-end p-2 ">
                    <label className="flex flex-row">Quantity:
                        <input
                        className="border w-9"
                        value={item.qty}
                        min="0"
                        type="number"
                        onChange={onQtyChange}
                        />
                    </label>

                <button
                    onClick={onDelete}
                    className="w-7"
                >
                    {/*todo: add ARIA to this button*/}
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


