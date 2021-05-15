package no.ntnu.exam2021.backend.itemOrderRelation;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import no.ntnu.exam2021.backend.item.Item;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

@Setter
@Getter
@Entity
public class ItemOrderRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name ="item_amount")
    int amount;

    @JsonManagedReference
    @ManyToOne
    @MapsId("orderID")
    @JoinColumn(name = "order_id")
    private Order order;

    @JsonManagedReference
    @ManyToOne
    @MapsId("itemID")
    @JoinColumn(name = "item_id")
    private Item item;

    public ItemOrderRelation(){
        //no arg constructor
    }

    /**
     * Order-Item relation
     *
     * @param order order
     * @param item item
     * @param amount this item amount
     */
    public ItemOrderRelation(
            Order order,
            Item item,
            int amount
    ){
        this.order = order;
        this.item = item;
        this.amount = amount;
    }

}
