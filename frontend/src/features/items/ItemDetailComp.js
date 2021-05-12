import React from "react";
import {selectItemById} from "./itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {itemAddedToCart} from "../cart/cartSlice";

const ItemDetail = () => {
    const {itemId} = useParams();
    const id = Number(itemId);
    const dispatch = useDispatch();
    const item = useSelector(state => selectItemById(state, id));


    const onAdd = () => {
        dispatch(itemAddedToCart(item));
    }

    return item ? (
        <div className="items-center justify-center m-auto">
            <div className="
            my-16
            p-6
            bg-grey
            flex
            flex-col
            items-center
            "
            >
                <h2 className="
                text-3xl
                font-bold
                mb-6
                inline-block
                align-middle"
                >
                    {item.name}
                </h2>
                <img
                    src={item.image ? "/ducks/" + item.image : "/ducks/404-duck.jpg"}
                    alt={"A picture of " + item.name}
                    className="
                max-w-xl
                m-auto"

                />
                <p
                    title="item description"
                    className="
                    my-6
                    overflow-hidden
                    flex-grow"
                >
                    {item.description}
                </p>
                <p
                    title="item price"
                    className="
                    my-4
                    text-lg
                    font-semibold"
                >
                    {item.price + ",- NOK"}
                </p>
                <button
                    className="
                        ml-4
                        rounded
                        border-2
                        border-gray-500
                        hover:bg-yellow
                        focus:bg-yellow
                        hover:border-black
                        focus:border-black"
                    name="AddToCart"
                    onClick={onAdd}
                >
                    Add to cart
                </button>
            </div>
        </div>
    ) : (
        <div>
            <h2 className="
                text-3xl
                font-bold
                mt-16
                inline-block
                align-middle"
            >
                No item with id {itemId} in store
            </h2>
        </div>
    )
}

export default ItemDetail;