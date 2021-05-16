package no.ntnu.exam2021.backend.cart;

import javax.validation.constraints.NotNull;

public class AddToCartDto {
    private Long id;
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
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
