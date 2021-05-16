package no.ntnu.exam2021.backend.itemOrderRelation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ItemOrderRelationRepository
        extends JpaRepository<ItemOrderRelation, Long> {

    List<ItemOrderRelation> findByItemIdIs(@Param("itemId") String itemId);


    //@Query("Select s FROM order_item_relation s WHERE s.order_id = ?1")
    //Optional<ItemOrderRelation> findOrderItemRelationByOrderId(String orderId);

}
