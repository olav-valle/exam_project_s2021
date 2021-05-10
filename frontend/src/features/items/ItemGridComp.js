import React, {useEffect, useState} from "react";
import {addItem, fetchItems, fetchItemProgressStatus, selectAllItems} from "./itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import ItemCard from "./ItemCardComp";
import {resetDatabase} from "../../app/client";


export const ItemGrid = () => {

    const dispatch = useDispatch();
    //Status from API
    const fetchStatus = useSelector(fetchItemProgressStatus);
    //item list from API
    const items = useSelector(selectAllItems);
    //search string
    const [search, setSearch] = React.useState("");
    //list of itemCards
    const [itemList, setItemList] = useState([]);
    // todo: Clear up the misplaced fetchItems dispatch
    // todo: add keys to item comp list
    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(fetchItems());
        }
    },)

    useEffect(() => {
        console.log("fetchStatus: " + fetchStatus);
        if (fetchStatus === 'fulfilled') {
            itemSearch();
        }
    }, [fetchStatus, search]);

    /**
     * Filter displayed items by searching by item name or description
     */
    function itemSearch() {

        const filterdItems = items.filter((item) =>
            item.name.toLowerCase().startsWith(search.toLowerCase())
            || item.description.toLowerCase().includes(search.toLowerCase())
        );

        let temp = filterdItems.map(item =>
            <ItemCard item={item}/>
        );

        setItemList(temp);
    }

    //todo: clear up unused functions and placeholders

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

    // for debuging
    //<button onClick={onAddProd}>AddProduct</button>
    //<button onClick={resetDb}> RESET DB</button>
    return fetchStatus === 'rejected' ? (<p>ERROR LOADING ITEMS</p>)
        : (
            <main title="All products">
                <div
                    title="searchBox"
                    className="
                    flex
                    flex-row
                    justify-end
                    p-2
                    mb-4
                    bg-grey-300
                    "
                >
                    <label
                        for="itemSearchBox"
                        className="
                            text-lg
                            font-semibold
                            mr-3"
                    >
                        Duck search:
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        id="itemSearchBox"
                        placeholder="Find a duck"
                        className="
                            pl-2
                            py-1
                            rounded-md
                            w-1/6
                            transition-width ease-in-out duration-700
                            focus:w-1/3
                            "
                    />
                </div>
                <h2 className="text-7xl font-bold text-center">
                    Our Pro-ducks
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