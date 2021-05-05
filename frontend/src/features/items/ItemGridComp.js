import React, {useEffect} from "react";
import {addItem, fetchItems, fetchItemProgressStatus, selectAllItems} from "./itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import ItemCard from "./ItemCardComp";
import {resetDatabase} from "../../app/client";


export const ItemGrid = () => {

    const dispatch = useDispatch();

    const fetchStatus = useSelector(fetchItemProgressStatus);

    const items = useSelector(selectAllItems);

    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(fetchItems());
        }
    },)

    // ### ADD ITEM PLACEHOLDER ###
    // Hardcoded item object added dispatched to API
    const onAddProd = () => {
        let newItem = {
            name: "newItem",
            description: "very descript, much informat",
            price: 200
        }

        dispatch(addItem(newItem));

    }

    // ### UI DEBUGGING HELPER ###
    const resetDb = async () => {
        await resetDatabase();
        dispatch(fetchItems());
    }

    // ### PLACEHOLDER ###
    let itemList;
    if (fetchStatus === 'fulfilled') {
        let key = 1;
        itemList = items.map(item => (
            <ItemCard key={key++} itemId={item.id}/>

        ))
    }

    // ### PLACEHOLDER RENDER METHOD ###
    return fetchStatus === 'rejected' ? (<p>ERROR LOADING ITEMS</p>)
        : (
            <main>
                <button onClick={onAddProd}>
                    AddProduct
                < /button>
                <div
                    className="w-11/12 flex flex-row flex-wrap place-content-start"
                >
                    {itemList}
                </div>
                <button onClick={resetDb}>RESET DB</button>
            </main>
        )

}

export default ItemGrid;