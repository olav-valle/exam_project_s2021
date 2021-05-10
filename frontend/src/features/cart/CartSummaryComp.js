import React from "react";
import {useDispatch} from "react-redux";
import {allItemsRemovedFromCart} from "./cartSlice";

const CartSummaryComp = ({totalQty, totalPrice}) => {

    const dispatch = useDispatch();

    const onOrderCheckout = () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm("Please confirm your order!")
        if (confirmed){
            alert("Thank you for your order!")
        }
        dispatch(allItemsRemovedFromCart());
    }

    return (<div
            className="
            fixed bottom-16
            w-full
            md:max-w-max
            md:static
            flex flex-col justify-between p-4 shadow
            rounded
            bg-white
            h-36
            my-4
            ">
            <h4 className="text-xl font-bold">Cart Summary:</h4>
            <div className="flex items-center">
                <span className="text-sm flex-1">TOTAL: ({totalQty} Items)</span>
                <span className="text-xl font-bold flex-0">NOK {totalPrice},-</span>
            </div>
            <button
                onClick={onOrderCheckout}
                className="
                py-2 px-3 rounded border
                bg-yellow
                text-xl font-bold
                cursor-pointer
                hover:opacity-75
                focus:outline-none focus:ring-2">
                Proceed To Checkout
            </button>
        </div>
    )
}

export default CartSummaryComp;