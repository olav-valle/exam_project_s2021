package no.ntnu.exam2021.backend.itemOrderRelation;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Data
@Embeddable
public class ItemOrderRelationKey {
    @Column(name = "item_id")
    private Long itemId;

}
