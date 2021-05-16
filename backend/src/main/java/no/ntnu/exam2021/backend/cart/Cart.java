package no.ntnu.exam2021.backend.cart;

import net.minidev.json.annotate.JsonIgnore;
import no.ntnu.exam2021.backend.User.User;
import no.ntnu.exam2021.backend.item.Item;

import javax.persistence.*;
import java.util.Date;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "created_date")
    private Date createdDate;

    @ManyToOne
    //TODO: "item_id" ?
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Item item;

    //TODO: Add dummy users and pray that it works
    @JsonIgnore
    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private int quantity;

    public Cart() {
    }

    public Cart(Item item, int quantity, User user) {
        this.user = user;
        this.item = item;
        this.quantity = quantity;
        this.createdDate = new Date();
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Item getItem() {
        return item;
    }

    public void setProduct(Item item) {
        this.item = item;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
