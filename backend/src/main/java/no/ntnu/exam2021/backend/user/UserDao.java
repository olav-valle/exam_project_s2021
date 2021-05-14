package no.ntnu.exam2021.backend.user;

import java.util.Optional;

public interface UserDao {

  Optional<User> selectApplicationUserByUsername(String username);

}
