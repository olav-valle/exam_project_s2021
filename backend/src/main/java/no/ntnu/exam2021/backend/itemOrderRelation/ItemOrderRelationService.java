package no.ntnu.exam2021.backend.itemOrderRelation;

import no.ntnu.exam2021.backend.cart.Cart;
import no.ntnu.exam2021.backend.cart.CartRepository;
import no.ntnu.exam2021.backend.item.Item;
import no.ntnu.exam2021.backend.item.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@Transactional
@Service
public class ItemOrderRelationService {

    private ItemRepository itemRepository;
    private CartRepository cartRepository;
    private final ItemOrderRelationRepository itemOrderRelationRepository;

    /**
     * Todo: add Java doc
     * @param itemRepository
     * @param cartRepository
     * @param itemOrderRelationRepository
     */
    public ItemOrderRelationService(
            ItemRepository itemRepository,
            CartRepository cartRepository,
            ItemOrderRelationRepository itemOrderRelationRepository
    ){
        this.itemRepository = itemRepository;
        this.cartRepository = cartRepository;
        this.itemOrderRelationRepository = itemOrderRelationRepository;

    }

    /**
     * Save and order-Itme relation to the database
     * @param cart the ordre to save
     * @param item the item to save
     * @param itemAmount the amount of that item
     */
    public void addItemToOrder(
            Cart cart,
            @NotNull Item item,
            @NotNull int itemAmount
    ){

        ItemOrderRelation relation = new ItemOrderRelation(cart, item, itemAmount);
        itemOrderRelationRepository.save(relation);
    }

    /**
     * Add an item-order relation to the database with the orders amount of that item
     * it the item or order does not exist in the database,
     * and IllegalArgumentException wil be thrown
     *
     * @param cartId the ID of the order/cart (needs to exist in the db)
     * @param itemId the Id of the item (needs to exist in the db)
     * @param itemAmount the amount of that item to add.
     */
    public void addItemToOrder(Integer cartId, Long itemId, int itemAmount){
        //todo: change from Integer to Long ^There

        Optional<Cart> orderOptional = cartRepository.findById(cartId);
        Optional<Item> itemOptional = itemRepository.findById(itemId);

        if (orderOptional.isEmpty()) throw new IllegalArgumentException("Cant find order with ID: " + cartId);
        if (itemOptional.isEmpty()) throw new IllegalArgumentException("Cant find item with ID: " + itemId);

        Cart cart = orderOptional.get();
        Item item = itemOptional.get();

        this.addItemToOrder(cart,item,itemAmount);
    }

}
