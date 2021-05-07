import React, {useEffect, useState} from "react";
import {getItemById} from "../../app/client";
import {itemDelete} from "./itemsSlice";
import {useDispatch} from "react-redux";
import { useParams } from "react-router-dom";

const ItemDetail =() => {
    const {itemId} = useParams();
    const dispatch = useDispatch();
    const [item, setItem] = useState(null);

    
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

    useEffect(() => {
        // since this is an effect hook, we have to do some hackery.
        // since useEffect expects a cleanup function as callback,
        // we make the callback an IIFE to avoid returning the Promise
        // produced by the async/await function
        (async () => {
            try {
                // we must await this expression,
                // because getItemById is promise based.
                // Without await, we end up with setItem(Promise<any>)
                // instead of the resolved response body.
                let item = await getItemById(itemId);
                setItem(item);
                console.log(item);
            } catch (e) {
            }
        })() // The (expression...)() syntax makes it so that
        // whatever is inside the first parens
    }, [itemId])

    const onDelete = (id) => {
        dispatch(itemDelete(id))
    }

    return item ? (<main
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
            onClick={() => onDelete(item.id)}
        >
            DELETE
        </button>
    </main>
    ) : (
        <main>
            <h2>No item with id {itemId} in store</h2>
        </main>
    )
}

export default ItemDetail;