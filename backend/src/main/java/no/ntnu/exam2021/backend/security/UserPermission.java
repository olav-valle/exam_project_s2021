package no.ntnu.exam2021.backend.security;

public enum UserPermission {

  ITEM_READ("item:read"),
  ITEM_WRITE("item:write"),
  CART_READ("cart:read"),
  CART_WRITE("cart:write")
  ;


  private final String permission;

  UserPermission(String permission) {
    this.permission = permission;
  }

  public String getPermission(){
    return permission;
  }
}
