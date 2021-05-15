package no.ntnu.exam2021.backend.security.token;

import com.google.common.net.HttpHeaders;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;
import org.springframework.context.annotation.Bean;
import javax.crypto.SecretKey;


@ConfigurationProperties(prefix = "application.security.token")
@ConstructorBinding
public class TokenConfig {

  private String secretKey;
  private String tokenPrefix;
  private Integer tokenExpirationAfterDays;

  public TokenConfig() {
    this.secretKey = "duckduckduckduckduckduckduckduckduckduckduckduckduckduckduckgoose";
    this.tokenPrefix = "Bearer ";
    this.tokenExpirationAfterDays = 10;
  }
  public String getSecretkey() { return secretKey; }

  public void setSecretKey(String secretKey) {
    this.secretKey = secretKey;
  }

  public String getTokenPrefix() {
    return tokenPrefix;
  }

  public void setTokenPrefix(String tokenPrefix) {
    this.tokenPrefix = tokenPrefix;
  }

  public Integer getTokenExpirationAfterDays() {
    return tokenExpirationAfterDays;
  }

  //todo: lower this to ~hour or minutes
  public void setTokenExpirationAfterDays(Integer tokenExpirationAfterDays) {
    this.tokenExpirationAfterDays = tokenExpirationAfterDays;
  }

  public String getAuthorizationHeader() {
    return HttpHeaders.AUTHORIZATION;
  }




}
