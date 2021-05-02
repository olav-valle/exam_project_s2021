import React, {useEffect} from "react";
import {fetchItems, itemDeleted, itemStatus, selectAllItems} from "./itemsSlice";
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

    const onDelete = (id) => {
        dispatch(itemDeleted(id))
    }

    let itemList;
    if (status === 'fulfilled') {
        itemList = items.map( item => (
            <div key={item.id}
                 className="
                 m-4
                 p-3
                 bg-gray-500
                 w-36
                 h-36
                 flex-grow-0
                 " >
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <button
                    onClick={() => onDelete(item.id)}
                >
                    DELETE
                </button>
            </div>
        ))
    }

    return (
        <div
        className="
        m-auto
        flex flex-row justify-between flex-wrap
        p-auto pt-20
        last:mr-auto
        "
        >
            {itemList}
            {itemList}
            {itemList}

        </div>
    )
}

export default ItemGrid;