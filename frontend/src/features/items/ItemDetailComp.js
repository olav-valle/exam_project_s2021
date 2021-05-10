import React, {useEffect, useState} from "react";
import {getItemById} from "../../app/client";
import {itemDelete, selectItemById} from "./itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";

const ItemDetail =() => {
    const {itemId} = useParams();
    const id = Number(itemId);
    const dispatch = useDispatch();
    const item = useSelector(state => selectItemById(state, id));

    // problem: When an item is deleted, it seems like maybe
    // this useEffect method is called again on the re-render
    // of ItemGridComp, but the server no longer has an item
    // with this id (since it was deleted), and we get a
    // whole load of 404's...
    // What could cause this? The re-render is being performed using state
    // that is apparently not up-to-date with the server, since it contains
    // item id's that no longer exist.
    // we need to ensure that the re-render is only triggered once the store
    // has been updated with the new item list from the server.

    // useEffect(() => {
    //     // since this is an effect hook, we have to do some hackery.
    //     // since useEffect expects a cleanup function as callback,
    //     // we make the callback an IIFE to avoid returning the Promise
    //     // produced by the async/await function
    //     (async () => {
    //         try {
    //             // we must await this expression,
    //             // because getItemById is promise based.
    //             // Without await, we end up with setItem(Promise<any>)
    //             // instead of the resolved response body.
    //             let item = await getItemById(itemId);
    //             setItem(item);
    //             console.log(item);
    //         } catch (e) {
    //         }
    //     })() // The (expression...)() syntax makes it so that
    //     // whatever is inside the first parens
    // }, [itemId])

    const onDelete = (id) => {
        dispatch(itemDelete(id))
    }

    return item ? (
    <main>  
        <div className="
            mx-auto
            my-16
            p-6
            bg-grey
            flex
            inline-flex	
            flex-grow
            flex-col
            justify-between
            justify-items-center
            border-4
            border-yellow
            rounded-2xl"
        >
            <h2 className="
                text-3xl
                font-bold
                mb-6
                inline-block
                align-middle"
            >
                {item.name}
            </h2>
            <img
                src={item.image ? "/ducks/"+item.image: "/ducks/404-duck.jpg"}
                alt="picture of the product"
                className="
                max-w-xl
                m-auto"
                
            />
            <p 
                title="item description"
                className="
                    my-6
                    overflow-hidden
                    flex-grow"
            >
                {item.description}
            </p>
            <p
                title="item price"
                className="
                    my-4
                    text-lg
                    font-semibold"
            >
                {item.price + ",- NOK"}
                <button
                    className="
                        ml-4
                        rounded
                        border-2
                        border-gray-500
                        hover:bg-yellow
                        focus:bg-yellow
                        hover:border-black
                        focus:border-black"
                    name="AddToCart"
                > 
                    Add to cart
                </button> 
            </p>   
        </div>
    </main>
    ) : (
        <main>
            <h2 className="
                text-3xl
                font-bold
                mt-16
                inline-block
                align-middle"
            >
                No item with id {itemId} in store
            </h2>
        </main>
    )
}

export default ItemDetail;