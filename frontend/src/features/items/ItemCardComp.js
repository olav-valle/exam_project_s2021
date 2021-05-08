import React, {useEffect, useState} from "react";
import {itemDelete} from "./itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import {getItemQtyByItemId, itemAdded, itemQuantityChanged} from "../cart/cartSlice";
import {store} from "../../app/store";

// ### PLACEHOLDER COMPONENT ###
// Has basic example implementations of state logic and Redux interaction
const ItemCard = ({itemAsProp}) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState(itemAsProp);

    const onDelete = (id) => {
        dispatch(itemDelete(id))
    }

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
    const qty = useSelector(state =>
        getItemQtyByItemId(state, item.id));


    const onQtyChange = (e) => {
        // setQty(e.target.value);
        dispatch(itemQuantityChanged(item.id, e.target.value));
    }

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
        >
            ADD
        </button>
            <input className="border w-1/2" value={qty} min="0" type="number" onChange={onQtyChange}/>
    </div>) : null
}

export default ItemCard;