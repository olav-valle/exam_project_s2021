import '../../App.css';
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import {itemAdded} from "../cart/cartSlice";

/**
 * Takes a "item" object from the API and creates a card component 
 * item should to contain (id, name, description, price, img)
 * 
 * @param { item } param0 
 * @returns <ItemCard>
 */
const ItemCard = ({ item }) => {

    const dispatch = useDispatch();
  
    const onAdd = (item) => {
        dispatch(itemAdded(item));
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
                bg-grey-300
                flex
                flex-col
                border-4
                rounded-md
                border-grey-300
                hover:border-yellow"
    >
        <Link 
            className="
                itemCardLink
                border-4 
                border-grey-300
                focus:border-yellow
                flex
                flex-grow
                flex-col
                justify-between"
            to={"/shop/product/" + item.id}
            aria-label={"Product: " + item.name}
        >
            <img 
                alt="picture of the product"
                src={item.img ? item.img : "https://imgur.com/skXkXRr.png"}
            />
            <h3
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
            onClick={() => onAdd(item)}
            name="AddToCart"
        > 
            Add to cart
        </button>
    </article>)
}

export default ItemCard;