package no.ntnu.exam2021.backend.security.token;

import com.google.common.net.HttpHeaders;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;


@ConfigurationProperties(prefix = "application.security.token")
@ConstructorBinding
public class TokenConfig {

  private String secretKey;
  private String tokenPrefix;
  private Integer tokenExpirationAfterSeconds;

  public TokenConfig() {
    this.secretKey = "duckduckduckduckduckduckduckduckduckduckduckduckduckduckduckgoose";
    this.tokenPrefix = "Bearer ";
    this.tokenExpirationAfterSeconds = 1800;
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

  public Integer getTokenExpirationAfterSeconds() {
    return tokenExpirationAfterSeconds;
  }

  //todo: lower this to ~hour or minutes
  public void setTokenExpirationAfterSeconds(Integer tokenExpirationAfterDays) {
    this.tokenExpirationAfterSeconds = tokenExpirationAfterDays;
  }

  public String getAuthorizationHeader() {
    return HttpHeaders.AUTHORIZATION;
  }




}
