import React, {useEffect} from "react";
import {fetchItems, itemStatus, selectAllItems} from "./itemsSlice";
import {useDispatch, useSelector} from "react-redux";


export const ItemGrid = () => {

    const dispatch = useDispatch();

    const status = useSelector(itemStatus);

    const items = useSelector(selectAllItems);

    useEffect( () => {
        if ( status === 'idle' ){
            dispatch(fetchItems());
        }
    })

    let itemList;
    if (status === 'fulfilled') {
        itemList = items.map( item => (
            <div key={item.id}>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>{item.price}</p>
            </div>
        ))
    }

    return (
        <div>
            {itemList}
        </div>
    )
}

export default ItemGrid;