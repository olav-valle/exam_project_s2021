import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {itemAddedToCart} from "../cart/cartSlice";

/**
 * Takes a "item" object from the API and creates a card component
 * item should to contain (id, name, description, price, img)
 *
 * @param { item } param0
 * @returns <ItemCard>
 */
const ItemCard = ({item}) => {
    const dispatch = useDispatch();

    const onAddToCart = (item) => {
        dispatch(itemAddedToCart(item));
    }

    return (
        <article
            className="
                m-4
                p-3
                w-full
                sm:w-3/5
                md:w-1/3
                lg:w-1/4
                xl:w-1/5
                flex
                flex-col
                border
                rounded-md
                border-white
                shadow
                focus-within:border-yellow
                focus-within:shadow-orange
                hover:border-yellow
                hover:shadow-orange
                "
        >
            <Link
                title="Open product page"
                className="
                itemCardLink
                border-4 
                border-white
                focus:border-yellow
                flex
                flex-grow
                flex-col
                justify-between"
                to={"/shop/product/" + item.id}
                aria-label={"Product: " + item.name}
            >
                <img
                    title="Item picture"
                    alt={"A picture of " + item.name}
                    src={item.image ? "/ducks/" + item.image : "/ducks/404-duck.jpg"}
                />
                <h3
                    title="Item Name"
                    className="
                    text-lg
                    font-semibold"
                >
                    {item.name ? item.name : "Missing Pro-Duckt name"}
                </h3>
                <p
                    title="item description"
                    className="
                    overflow-hidden
                    flex-grow
                    text-lg"
                >
                    {item.description ? item.description : "No pro-duckt description"}
                </p>
                <p
                    title="item price"
                    className="
                    text-lg
                    font-semibold"
                >
                    {item.price ? item.price + ",- NOK" : "Just because this have no price does not mean it's free"}
                </p>
            </Link>
            <button
                className="
                rounded
                border-2
                border-gray-500
                hover:bg-yellow
                focus:bg-yellow
                hover:border-black
                focus:border-black"
                onClick={() => onAddToCart(item)}
                name="AddToCart"
                title="Add to cart"
            >
                Add to cart
            </button>
        </article>)
}

export default ItemCard;