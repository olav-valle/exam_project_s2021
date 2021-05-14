package no.ntnu.exam2021.backend.user;

import static no.ntnu.exam2021.backend.security.UserRole.ADMIN;
import static no.ntnu.exam2021.backend.security.UserRole.CUSTOMER;


import com.google.common.collect.Lists;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository("temp")
public class TempUserDaoService implements UserDao {

  private final PasswordEncoder passwordEncoder;

  @Autowired
  public TempUserDaoService(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public Optional<User> selectApplicationUserByUsername(String username) {
    return getUsers()
        .stream()
        .filter(user -> username.equals(user.getUsername()))
        .findFirst();
  }

  private List<User> getUsers() {
    List<User> users = Lists.newArrayList(
        new User(
            "user",
            passwordEncoder.encode("user"),
            CUSTOMER.getGrantedAuthorities(),
            true,
            true,
            true,
            true),
        new User(
            "admin",
            passwordEncoder.encode("admin"),
            ADMIN.getGrantedAuthorities(),
            true,
            true,
            true,
            true),
        new User(
            "otherUser",
            passwordEncoder.encode("otherUser"),
            CUSTOMER.getGrantedAuthorities(),
            true,
            true,
            true,
            true)
    );
    return users;
  }
}
