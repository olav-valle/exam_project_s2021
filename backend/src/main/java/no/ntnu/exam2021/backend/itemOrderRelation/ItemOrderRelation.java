package no.ntnu.exam2021.backend.itemOrderRelation;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import no.ntnu.exam2021.backend.cart.Cart;
import no.ntnu.exam2021.backend.item.Item;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "order_item_relation")
public class ItemOrderRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name ="item_amount")
    int amount;

    @JsonManagedReference
    @ManyToOne
    @MapsId("cartId")
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @OneToOne(targetEntity = Item.class)
    @JoinColumn(name = "item_id")
    private Item item;

    public ItemOrderRelation(){
        //no arg constructor
    }

    /**
     * Order-Item relation
     *
     * @param cart order
     * @param item item
     * @param amount this item amount
     */
    public ItemOrderRelation(
            Cart cart,
            Item item,
            int amount
    ){
        this.cart = cart;
        this.item = item;
        this.amount = amount;
    }

}
