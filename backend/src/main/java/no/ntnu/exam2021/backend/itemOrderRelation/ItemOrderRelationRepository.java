package no.ntnu.exam2021.backend.itemOrderRelation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ItemOrderRelationRepository
        extends JpaRepository<ItemOrderRelation, Long> {
    //how to duck?
}
