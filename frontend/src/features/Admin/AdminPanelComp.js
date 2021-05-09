import React from "react";
import {selectAllItems} from "../items/itemsSlice";
import NewItemFormComp from "./NewItemFormComp";
import {useSelector} from "react-redux";


const AdminPanelComp = () => {


    const items = useSelector(selectAllItems);

    let itemsList;
    if (items.length > 0 && (typeof items[0] !== "undefined")) {
        itemsList = items.map(item => <NewItemFormComp key={item.id} itemId={item.id}/> )
    }

    return (
        <main className="flex flex-col justify-center max-w-min mx-auto">
            <h1>Add new item:</h1>
            <NewItemFormComp/>
            <h1>Administrate existing items:</h1>
            {itemsList}
        </main>
    )


}

export default AdminPanelComp;