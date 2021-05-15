package no.ntnu.exam2021.backend.itemOrderRelation;

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
    private OrderRepository orderRepository;
    private final ItemOrderRelationRepository itemOrderRelationRepository;

    /**
     * Todo: add Java doc
     * @param itemRepository
     * @param orderRepository
     * @param itemOrderRelationRepository
     */
    public ItemOrderRelationService(
            ItemRepository itemRepository,
            OrderRepository orderRepository,
            ItemOrderRelationRepository itemOrderRelationRepository
    ){
        this.itemRepository = itemRepository;
        this.orderRepository = orderRepository;
        this.itemOrderRelationRepository = itemOrderRelationRepository;

    }

    /**
     * Save and order-Itme relation to the database
     * @param order the ordre to save
     * @param item the item to save
     * @param itemAmount the amount of that item
     */
    public void addItemToOrder(
            @NotNull Order order,
            @NotNull Item item,
            @NotNull int itemAmount
    ){

        ItemOrderRelation relation = new ItemOrderRelation(order, item, itemAmount);
        itemOrderRelationRepository.save(relation);
    }

    /**
     * Add an item-order relation to the database with the orders amount of that item
     * it the item or order does not exist in the database,
     * and IllegalArgumentException wil be thrown
     *
     * @param orderId the ID of the order (needs to exist in the db)
     * @param itemId the Id of the item (needs to exist in the db)
     * @param itemAmount the amount of that item to add.
     */
    public void addItemToOrder(Long orderId, Long itemId, int itemAmount){
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        Optional<Item> itemOptional = itemRepository.findById(itemId);

        if (orderOptional.isEmpty()) throw new IllegalArgumentException("Cant find order with ID: " + orderId);
        if (itemOptional.isEmpty()) throw new IllegalArgumentException("Cant find item with ID: " + itemId);

        Order order = orderOptional.get();
        Item item = itemOptional.get();

        this.addItemToOrder(order,item,itemAmount);
    }

}
