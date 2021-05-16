package no.ntnu.exam2021.backend.cart;

import javax.validation.constraints.NotNull;
import no.ntnu.exam2021.backend.item.Item;

//Code based upon work from: https://github.com/webtutsplus/ecommerce-backend but modified to suit our needs.

public class CartItemDto {
    private Integer id;
    private @NotNull Integer userId;
    private @NotNull Integer quantity;
    private @NotNull Item item;

    public CartItemDto() {
    }

    public CartItemDto(Cart cart) {
        this.setId(cart.getId());
        //this.setUserId(cart.getUser().getId());
        this.setQuantity(cart.getQuantity());
        this.setItem(cart.getItem());
    }

    @Override
    public String toString() {
        return "CartDto{" +
                "id=" + id +
                ", userId=" + userId +
                ", quantity=" + quantity +
                ", itemName=" + item.getName() +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
