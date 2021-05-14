package no.ntnu.exam2021.backend.security.token;

public class TokenAuthenticationRequest {
  private String username;
  private String password;

  public TokenAuthenticationRequest() {
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}

