package no.ntnu.exam2021.backend.cart;

import no.ntnu.exam2021.backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findAllByUserOrderByCreatedDateDesc(User user);

    List<Cart> deleteByUser(User user);
}
