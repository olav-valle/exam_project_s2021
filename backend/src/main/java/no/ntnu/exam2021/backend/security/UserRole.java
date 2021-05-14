package no.ntnu.exam2021.backend.security;


import static no.ntnu.exam2021.backend.security.UserPermission.CART_READ;
import static no.ntnu.exam2021.backend.security.UserPermission.CART_WRITE;
import static no.ntnu.exam2021.backend.security.UserPermission.ITEM_READ;
import static no.ntnu.exam2021.backend.security.UserPermission.ITEM_WRITE;


import com.google.common.collect.Sets;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum UserRole {
  ADMIN(Sets.newHashSet(CART_READ, CART_WRITE, ITEM_READ, ITEM_WRITE)),
  CUSTOMER(Sets.newHashSet(ITEM_READ, CART_WRITE, CART_READ));

  private final Set<UserPermission> permissions;

  UserRole(Set<UserPermission> permissions) {
    this.permissions = permissions;
  }

  public Set<UserPermission> getPermissions(){
    return permissions;
  }

  public Set<SimpleGrantedAuthority> getGrantedAuthorities(){
    Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
        .map(p -> new SimpleGrantedAuthority(p.getPermission()))
        .collect(Collectors.toSet());

    permissions.add(new SimpleGrantedAuthority("ROLE_"+this.name()));

    return permissions;
  }
}
