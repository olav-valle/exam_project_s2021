package no.ntnu.exam2021.backend.cart;

//Code based upon work from: https://github.com/webtutsplus/ecommerce-backend but modified to suit our needs.

import javax.validation.constraints.NotNull;

public class AddToCartDto {
    private Integer id;
    private @NotNull Integer itemId;
    private @NotNull Integer quantity;

    public AddToCartDto() {
    }

    @Override
    public String toString() {
        return "CartDto{" +
                "id=" + id +
                ", itemId=" + itemId +
                ", quantity=" + quantity +
                ",";
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
