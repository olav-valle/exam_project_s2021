import {useDispatch, useSelector} from "react-redux";
import {itemQuantityChanged, itemRemovedFromCart, selectCartItemById} from "./cartSlice";
import React from "react";


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
        <div className="
        my-4
        flex flex-row
        rounded-md
        border-white
        shadow
        focus-within:border-yellow
        focus-within:shadow-orange
        hover:border-yellow
        hover:shadow-orange
        w-screen
        md:w-auto
        md:min-w-max">
            <img
                alt={"A picture of " + item.name}
                className="w-36 object-contain rounded"
                src={item.image ? "/ducks/" + item.image : "/ducks/404-duck.jpg"}
            />

            <div className="flex p-4 flex-grow-1 flex-col items-start w-full justify-between backdrop-grayscale">
                <p className="font-bold text-base">{item.name}</p>
                <p className="text-sm">{item.description}</p>
                <p className="text-base font-bold">{item.price},-</p>
            </div>

            <div className="flex flex-col justify-around items-end p-2 ">
                <label className="flex flex">Quantity:
                    <input
                        aria-label="Item Quantity"
                        className="border w-9"
                        value={item.qty}
                        min="0"
                        type="number"
                        onChange={onQtyChange}
                    />
                </label>

                <button
                    name="remove item"
                    aria-label="Remove Item From Cart."
                    onClick={onDelete}
                    className="hover:text-red-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>

    ) : null;

}

export default CartItemCard;


