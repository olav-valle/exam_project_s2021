import React, {useEffect, useState} from "react";
import {fetchItemProgressStatus, selectAllItems} from "./itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import ItemCard from "./ItemCardComp";


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

    useEffect(() => {
        console.log("fetchStatus: " + fetchStatus);
        if (fetchStatus === 'fulfilled') {
            itemSearch();
        }
    }, [fetchStatus, search]);

    /**
     * Filter displayed items by searching by item name or description
     */
    function itemSearch(){
        const filterdItems = items.filter((item) => 
            item.name.toLowerCase().includes(search.toLowerCase())
            || item.description.toLowerCase().includes(search.toLowerCase())
        );
        console.log(items);
        let temp = filterdItems.map(item => 
            <ItemCard item={item}  key={item.id}/>
        );

        setItemList(temp);
    }

    return fetchStatus === 'rejected' ? (<p>ERROR LOADING ITEMS</p>)
        : (
            <div title="All products">
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
            </div>
        )
}

export default ItemGrid;