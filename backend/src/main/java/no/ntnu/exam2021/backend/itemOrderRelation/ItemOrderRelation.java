package no.ntnu.exam2021.backend.itemOrderRelation;

import lombok.Getter;
import lombok.Setter;
import no.ntnu.exam2021.backend.item.Item;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "item_order_relation")
public class ItemOrderRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name ="item_amount")
    int amount;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Item item;

    public ItemOrderRelation(){
        //no arg constructor
    }

    @Autowired
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
