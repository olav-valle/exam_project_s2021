import React, {useState} from "react";
import {itemDelete} from "./itemsSlice";
import {useDispatch} from "react-redux";
import {itemAdded} from "../cart/cartSlice";

// ### PLACEHOLDER COMPONENT ###
// Has basic example implementations of state logic and Redux interaction
const ItemCard = ({itemAsProp}) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState(itemAsProp);

    // Example of how to dispatch the action of adding an item to the cart.
    const onAdd = (item) => {
        dispatch(itemAdded(item));
    }

    // Example implementation of how to dispatch item quantity changes
    // from a number input element, and into redux cart state
    // const [qty, setQty] = useState("");

    // when using selector functions with parameters other than just 'state'
    // we must make sure to pass both the parameter, and 'state' when calling
    // the selector.
    // fixme: Why did this break again?! :( Fucking "state is undefined" error...
    // const qty = useSelector((state) =>{
    //     console.log(state);
    //     return getItemQtyByItemId(state, item.id);
    // });

    return item ? (<div
        className="
                 m-4
                 p-3
                 bg-gray-500
                 w-36
                 h-36
                 flex-grow-0
                 ">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>{item.price}</p>

        <button
            onClick={() => onAdd(item)}
            className="border hover:bg-blue-light"
        >
            ADD TO CART
        </button>
    </div>) : null
}

export default ItemCard;