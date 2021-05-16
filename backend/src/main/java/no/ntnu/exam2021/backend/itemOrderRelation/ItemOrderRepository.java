package no.ntnu.exam2021.backend.itemOrderRelation;

import no.ntnu.exam2021.backend.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemOrderRepository extends JpaRepository<Cart, Long> {
}
