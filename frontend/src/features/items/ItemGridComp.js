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
        console.log(items);
        itemList = items.map(item => (
            <ItemCard 
                key={key++}
                itemId={item.id}
                itemName={item.name}
                itemDescription={item.description}
                itemPrice={item.price}
                itemImg={item.image}
            />
        ))
    }

    // for debuging
    //<button onClick={onAddProd}>AddProduct</button>
    //<button onClick={resetDb}> RESET DB</button>

    return fetchStatus === 'rejected' ? (<p>ERROR LOADING ITEMS</p>)
        : (
            <main title="All products">
                <h2 
                    className="
                    text-9xl
                    font-bold"
                >
                    Store Pro-ducks
                </h2>
                <div
                    className="
                        itemCard
                        flex
                        flex-row
                        flex-wrap
                        max-w-x5
                        place-content-start
                        justify-center"
                >
                    {itemList}
                </div>
            </main>
        )
}

export default ItemGrid;