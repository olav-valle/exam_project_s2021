import React, {useState} from "react";
import {addItem, selectItemById} from "../items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import {updateItem} from "../../app/client";


const NewItemFormComp = ({itemId}) => {
    let id = ""
    if (itemId) id = itemId;

    const item = useSelector(state =>
        selectItemById(state, id));

    let initialName = "";
    let initialDescr = "";
    let initialPrice = "";

    if (item) {
        initialName = item.name;
        initialDescr = item.description;
        initialPrice = item.price;
    }
    const [name, setName] = useState(initialName);
    const [descr, setDescr] = useState(initialDescr);
    const [price, setPrice] = useState(initialPrice);

    const onNameChange = e => setName(e.target.value);
    const onDescrChange = e => setDescr(e.target.value);
    const onPriceChange = e => setPrice(e.target.value);

    const dispatch = useDispatch();

    //todo: disable buttons while API calls are being dispatched.
    const onSubmitClick = () => {
        let newItem = {
            name: name,
            description: descr,
            price: price
        }

        if (typeof item !== "undefined") {
            // Item exists, and we need to update it
            //todo: add thunk duck for this
            const promise = updateItem({...newItem, id: item.id, _links: item._links});
        }
        if (typeof item === "undefined"){
            // item does not exist, and we need to create a new one
            dispatch(addItem(newItem));
            setName("");
            setPrice("");
            setDescr("");

        }

    }

    return (
        <div aria-roledescription="form" onKeyDown={(e) => e.key !== 'Enter'}
              className=" flex flex-row items-center h-15 bg-grey my-1 children:mx-1 ">
            <label htmlFor="itemName">Name:</label>
            <input
                aria-labelledby="itemName"
                className=" border focus:ring-2"
                type=" text"
                id="itemName"
                name="itemName"
                value={name}
                placeholder=" Item name"
                onChange={onNameChange}
            />
            <label htmlFor="itemDescr">Description:</label>
            <input
                className=" border focus:ring-2"
                type=" text"
                id="itemDescr"
                name=" itemDescr"
                value={descr}
                aria-labelledby="itemDescr"
                placeholder=" Describe the item"
                onChange={onDescrChange}
            />
            <label htmlFor=" itemPrice">Price:</label>
            <input
                aria-labelledby="itemName"
                className=" border focus:ring-2 w-10"
                type=" number"
                min="0"
                id="itemPrice"
                name="itemPrice"
                value={price}
                placeholder="0"
                onChange={onPriceChange}
            />
            <button
                onClick={onSubmitClick}
                className="bg-green-light focus:ring-2 hover:bg-green-dark font-bold hover:text-white focus:text-white focus:bg-green-dark rounded px-1">Finish</button>
        </div>
    )


}

export default NewItemFormComp;