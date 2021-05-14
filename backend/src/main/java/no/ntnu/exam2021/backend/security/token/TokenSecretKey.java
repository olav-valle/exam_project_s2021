package no.ntnu.exam2021.backend.security.token;

import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TokenSecretKey {

  private final TokenConfig tokenConfig;

  @Autowired
  public TokenSecretKey(TokenConfig tokenConfig) {
    this.tokenConfig = tokenConfig;
  }

  @Bean
  public SecretKey secretKey() {
    return Keys.hmacShaKeyFor(tokenConfig.getSecretkey().getBytes());
  }
}
