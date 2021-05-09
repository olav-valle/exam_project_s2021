import React, {useEffect, useState} from "react";
import '../../App.css';
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";

// ### PLACEHOLDER COMPONENT ###
// Has basic example implementations of state logic and Redux interaction
const ItemCard = ({ item }) => {

    const dispatch = useDispatch();

    const onAddToCart = (id) => {
        //add to cart. 
        console.log("item " + id + "added to the cart");
    }


    return (
    <article 
        className="
                 m-4
                 p-3
                 w-full
                 sm:w-3/5
                 md:w-1/3
                 lg:w-1/4
                 xl:w-1/5
                 bg-grey
                 flex
                 flex-col
                 border-4
                 rounded-md
                 border-grey
                 hover:border-yellow"
    >
        <Link 
            className="
                itemCardLink
                border-4 
                border-grey
                focus:border-yellow
                flex
                flex-grow
                flex-col
                justify-between"
            to={"/shop/product/" + item.id}
            aria-label={"Product: " + item.name}
        >
            <img 
                alt="picture of the product"
                src="https://imgur.com/skXkXRr.png"
            />
            <h3
                className="
                    text-lg
                    font-semibold"
            >
                {item.name}
            </h3>
            <p 
                title="item description"
                className="
                    overflow-hidden
                    flex-grow
                    text-lg"
            >
                {item.description}
            </p>
            <p
                title="item price"
                className="
                    text-lg
                    font-semibold"
            >
                {item.price + ",- NOK"} 
            </p>    
        </Link>
        <button
            className="
                rounded
                border-2
                border-gray-500
                hover:bg-yellow
                focus:bg-yellow
                hover:border-black
                focus:border-black"
            onClick={() => onAddToCart(item.id)}
            name="AddToCart"
        > 
            Add to cart
        </button>
    </article>)
}

export default ItemCard;