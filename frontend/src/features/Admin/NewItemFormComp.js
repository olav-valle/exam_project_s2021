import React, {useState} from "react";
import {addItem, itemDelete, itemUpdated, selectItemById} from "../items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import {updateItem} from "../../app/client";

// This component can either be used as an empty form for adding new items to the database,
// or the form can be filled with the data of an existing item and edited.
const NewItemFormComp = ({itemId}) => {
    // Can we find an item matching the itemId prop?
    let id = ""
    if (itemId) id = itemId;
    const item = useSelector(state =>
        selectItemById(state, id));

    // Start with empty input field values
    let initialName = "";
    let initialDescr = "";
    let initialPrice = "";
    let initialImage = "";


    // If an item was found, set field values to item values
    if (item) {
        initialName = item.name;
        initialDescr = item.description;
        initialPrice = item.price;
        initialImage = item.image;
    }
    // Set input fields to the values we decided above
    const [name, setName] = useState(initialName);
    const [descr, setDescr] = useState(initialDescr);
    const [price, setPrice] = useState(initialPrice);
    const [image, setImage] = useState(initialImage);

    // Update local state values when a  field changes.
    // todo: validate input field values, and reset if invalid? (empty string etc..)
    //  use onBlur instead of onChange, to prevent unwanted resets while user is editing field value?
    const onNameChange = e => setName(e.target.value);

    const onNameBlur = e => {
        if (item) {
            let newValue = e.target.value.trim();
            if (newValue.length === 0) {
                setName(item.name);
            }
        }
    }
    const onDescrChange = e => setDescr(e.target.value);
    const onDescrBlur = e => {
        if (item) {
            let newValue = e.target.value.trim();
            if (newValue.length === 0) {
                setDescr(item.description);
            }
        }
    }

    const onImageChange = e => setImage(e.target.value);
    const onImageBlur = e => {
        if (item) {
            let newImage = e.target.value.trim();
            if (newImage.length === 0) {
                setImage(item.image);
            }
        }
    }

    const onPriceChange = e => setPrice(e.target.value);

    const dispatch = useDispatch();

// Submit button click action
    const onSubmitClick = () => {
        // Grab values from fields
        let newItem = {
            name: name,
            description: descr,
            price: price,
            image: image
        }

        if (typeof item !== "undefined") {
            // Item exists, and we need to update it
            dispatch(itemUpdated({...newItem, id: item.id, _links: item._links}));
            // const promise = updateItem({...newItem, id: item.id, _links: item._links});
        }
        if (typeof item === "undefined") {
            // item does not exist, and we need to create a new one
            dispatch(addItem(newItem));
            // Reset form fields
            setName("");
            setPrice("");
            setDescr("");
            setImage("");
        }

    }

    // Delete item button
    const onDelete = () => {
        dispatch(itemDelete(item.id));
    }

// boolean describing whether all fields in form have valid values,
// to toggle "Finish" button disabled/enabled.
    const finishButtonEnabled = item ?
        // is name, description or price in component state different from item in store?
        ((name !== item.name) || (descr !== item.description) || (price !== item.price)) || (image !== item.image)
        // If no item, are all 3 fields filed with values?
        : (name && descr && price);

    // todo: remove this
    let itemIdElement = "";
    if (item) {
        itemIdElement = (
            <label htmlFor="itemId">
                ID:
                <p>{itemId}</p>
            </label>
        )
    }


    return (
        <div aria-roledescription="form"
             onKeyDown={(e) => e.key !== 'Enter'}
             className="flex flex-col sm:flex-row sm:items-center h-15 bg-grey-200 my-1 children:my-1"
        >

            {item
                ?
                <label id="item-id" className="flex flex-row sm:flex-col" htmlFor="itemId">
                    ID:
                    <p>{itemId}</p>
                </label>
                :
                ""
            }
            <div id="item-name-descr" className="flex flex-col lg:flex-row children:mx-1">


                <label htmlFor="itemName">Name:
                    <input
                        // aria-labelledby="itemName"
                        className=" border focus:ring-2"
                        type="text"
                        // id="itemName"
                        name="itemName"
                        value={name}
                        placeholder=" Item name"
                        onChange={onNameChange}
                        onBlur={onNameBlur}
                    />
                </label>

                <label htmlFor="itemDescr">Description:
                    <input
                        // aria-labelledby="itemDescr"
                        className="border focus:ring-2"
                        type="text"
                        // id="itemDescr"
                        name="itemDescr"
                        value={descr}
                        placeholder=" Describe the item"
                        onChange={onDescrChange}
                        onBlur={onDescrBlur}
                    />
                </label>

                <label htmlFor="itemImage">
                    Image name:
                    <input
                        // aria-labelledby="itemDescr"
                        className="border focus:ring-2"
                        type="text"
                        // id="itemDescr"
                        name="itemImage"
                        value={image}
                        placeholder="Item image file name"
                        onChange={onImageChange}
                        onBlur={onImageBlur}
                    />

                </label>

            </div>

            <div id="item-price-buttons" className="flex flex-row justify-between children:mx-2">
                <label
                    // htmlFor="itemPrice"
                >
                    Price:
                    <input
                        // aria-labelledby="itemPrice"
                        className="border focus:ring-2 w-16"
                        type="number"
                        min="0"
                        // id="itemPrice"
                        name="itemPrice"
                        value={price}
                        placeholder="0"
                        onChange={onPriceChange}
                    />
                </label>

                <button
                    disabled={finishButtonEnabled ? "" : "disabled"}
                    onClick={onSubmitClick}
                    className="
                disabled:bg-grey-300 disabled:text-grey-700 disabled:border-grey-700
                border
                rounded
                self-end
                bg-green-light focus:ring-2
                hover:bg-green-dark font-bold hover:text-white
                focus:text-white focus:bg-green-dark px-1"
                >
                    Save
                </button>
                {item
                    ?
                    <button
                        onClick={onDelete}
                        className="
                px-1
                border rounded
                self-end
                bg-red-400 focus:ring-2
                font-bold
                hover:bg-red-600 hover:text-white
                focus:text-white focus:bg-green-600"
                    >
                        Delete
                    </button> : ""
                }</div>

        </div>
    )


}

export default NewItemFormComp;