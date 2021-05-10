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
            <h4 className="text-xl font-bold">Cart Summary:</h4>
            <div className="flex items-center">
                <span className="text-sm flex-1">TOTAL: ({totalQty} Items)</span>
                <span className="text-xl font-bold flex-0">NOK {totalPrice},-</span>
            </div>
            <button
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