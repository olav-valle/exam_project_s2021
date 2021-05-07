import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";

// ### PLACEHOLDER COMPONENT ###
// Has basic example implementations of state logic and Redux interaction
const ItemCard = ({
        itemId,
        itemImg,
        itemName,
        itemDescription,
        itemPrice
    }) => {

    const dispatch = useDispatch();

    const onAddToCart = (id) => {
        //add to cart. 
        console.log("item " + id + "edded to the cart");
    }


    return (
    <article 
        className="
                 m-4
                 p-3
                 bg-gray-700
                 w-1/5
                 max-w-x1
                 flex-grow-0"
        title={itemName}
    >
        <Link to={"/shop/product/" + itemId}>
            <img 
                className="
                max-w-1/4"
                alt="product picture"
                src="https://imgur.com/skXkXRr.png"
            />
            <h3
                className="
                    text-lg
                    font-semibold"
            >
                {itemName}
            </h3>
            <p>{itemDescription}</p>
            <p
                className="
                    text-lg
                    font-semibold"
                title="item price"
            >
                {itemPrice} NOK
            </p>    
        </Link>
        <button
            className="
                rounded
                border-2
                border-gray-500"
            onClick={() => onAddToCart(itemId)}
            name="AddToCart"
        > 
            Add to cart
        </button>
    </article>)
}

export default ItemCard;