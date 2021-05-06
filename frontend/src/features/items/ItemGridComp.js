import React, {useEffect} from "react";
import {getProduct} from "../../app/API";


export const ItemGrid = () => {
    // temp debug items: 
    const products = [
        {
            name:"Product1",
            desc:"insert description here",
            imageSrc:"imageSrc"
        },
        {
            name:"Product2",
            desc:"insert description here",
            imageSrc:"imageSrc"
        }
    ];


    return (
        <div>
            <div>
                <input type="text" name="itemSearch" id="itemSearch" />
                <div className="viewSelect">
                    <button name="gridView">G</button>
                    <button name="listView">L</button>
                </div>
            </div>
            <h3>This is a list of items a person (or bot) can buy from our store (if it was real)</h3>
            <section className="shopItems" name="shop items">
                {
                    products.map((item) => (
                        <div>
                            <img src={item.imageSrc} />
                            <h4>{item.name}</h4>
                            <p>{item.desc}</p>
                            <button name="add to cart">+</button>
                        </div>
                    ))
                }
                <div className="add a grid"><p>I am an item, not a tea pot</p></div>
            </section>

        </div>
    )
}