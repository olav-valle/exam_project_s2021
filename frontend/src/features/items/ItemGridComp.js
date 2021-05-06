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

    // ### ADD ITEM PLACEHOLDER ###
    // Hardcoded item object added dispatched to API
    const onAddProd = () => {
        let newItem = {
            name: "newItem",
            description: "very descript, much informat",
            price: 200
        }

        dispatch(addItem(newItem));
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