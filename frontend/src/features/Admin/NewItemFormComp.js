import React, {useState} from "react";
import {addItem, itemDeleted, itemUpdated, selectItemById} from "../items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";

// This component can either be used as an empty form for adding new items to the database,
// or the form can be filled with the data of an existing item and edited.
const NewItemFormComp = ({itemId}) => {

    const dispatch = useDispatch();

    // Can we find an item matching the itemId prop?
    let id = ""
    if (itemId) id = Number(itemId);
    const item = useSelector(state =>
        selectItemById(state, id));

    // Start with empty input field values
    let initialName = "";
    let initialDescription = "";
    let initialPrice = "";
    let initialImage = "";


    // If an item was found, set field values to item values
    if (item) {
        initialName = item.name;
        initialDescription = item.description;
        initialPrice = item.price;
        initialImage = item.image;
    }
    // Set input fields to the values we decided above
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [image, setImage] = useState(initialImage);

    // Update local state values when a  field changes.
    const onNameInputChange = e => setName(e.target.value);

    const onNameInputBlur = e => {
        if (item) {
            let newValue = e.target.value.trim();
            if (newValue.length === 0) {
                setName(item.name);
            }
        }
    }

    const onDescriptionInputChange = e => setDescription(e.target.value);
    const onDescriptionInputBlur = e => {
        if (item) {
            let newValue = e.target.value.trim();
            if (newValue.length === 0) {
                setDescription(item.description);
            }
        }
    }

    const onImageInputChange = e => setImage(e.target.value);
    const onImageInputBlur = e => {
        if (item) {
            let newImage = e.target.value.trim();
            if (newImage.length === 0) {
                setImage(item.image);
            }
        }
    }

    const onPriceChange = e => setPrice(e.target.value);


// Submit button click action
    const onSubmitClick = () => {
        // Grab values from fields
        let newItem = {
            name: name,
            description: description,
            price: price,
            image: image
        }

        if (typeof item !== "undefined") {
            // Item exists, and we need to update it
            dispatch(itemUpdated({...newItem, id: item.id, _links: item._links}));
        }
        if (typeof item === "undefined") {
            // item does not exist, and we need to create a new one
            dispatch(addItem(newItem));
            // Reset form fields
            setName("");
            setPrice("");
            setDescription("");
            setImage("");
        }

    }

    // Delete item button
    const onDeleteClick = () => {
        dispatch(itemDeleted(item.id));
    }

// boolean describing whether all fields in form have valid values,
// to toggle "Finish" button disabled/enabled.
    const finishButtonEnabled = item
        // is name, description or price in component state different from item in store?
        ? ((name !== item.name) || (description !== item.description) || (price !== item.price)) || (image !== item.image)
        // If no item, are all 3 fields filed with values?
        : (name && description && price);


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
            <div id="item-name-description"
                 className="flex flex-col lg:flex-row children:mx-1">


                <label htmlFor="itemName">Name:
                    <input
                        className=" border focus:ring-2"
                        type="text"
                        name="itemName"
                        value={name}
                        placeholder=" Item name"
                        onChange={onNameInputChange}
                        onBlur={onNameInputBlur}
                    />
                </label>

                <label htmlFor="itemDescription">Description:
                    <input
                        className="border focus:ring-2"
                        type="text"
                        name="itemDescription"
                        value={description}
                        placeholder=" Describe the item"
                        onChange={onDescriptionInputChange}
                        onBlur={onDescriptionInputBlur}
                    />
                </label>

                <label htmlFor="itemImage">
                    Image name:
                    <input
                        className="border focus:ring-2"
                        type="text"
                        name="itemImage"
                        value={image}
                        placeholder="Item image file name"
                        onChange={onImageInputChange}
                        onBlur={onImageInputBlur}
                    />

                </label>

            </div>

            <div id="item-price-buttons" className="flex flex-row justify-between children:mx-2">
                <label>
                    Price:
                    <input
                        className="border focus:ring-2 w-16"
                        type="number"
                        min="0"
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
                {item ?
                    <button
                        onClick={onDeleteClick}
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
                    </button>
                    : ""
                }</div>

        </div>
    )
}

export default NewItemFormComp;