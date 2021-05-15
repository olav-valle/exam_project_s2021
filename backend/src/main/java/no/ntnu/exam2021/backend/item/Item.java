package no.ntnu.exam2021.backend.item;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import no.ntnu.exam2021.backend.itemOrderRelation.ItemOrderRelation;

import java.util.Set;

@Data
@Entity
@NoArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name cannot be blank.")
    private String name;

    @Positive(message = "Price cannot be negative number.")
    @NotNull(message = "Price cannot be empty.")
    private int price;

    //  @NotNull(message = "Description cannot be null.")
    private String description;

    //todo: image url?
    private String image;

    @JsonBackReference
    @OneToMany(mappedBy = "item")
    Set<ItemOrderRelation> ItemOrderRelation;




    public Item(
            @NotBlank(message = "Name cannot be blank.")
                    String name,
            @Positive(message = "Price cannot be negative number.")
            @NotNull(message = "Price cannot be empty.")
                    int price,
            String description,
            String image) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }

    public Long getId() {
        return this.id;
    }
}
