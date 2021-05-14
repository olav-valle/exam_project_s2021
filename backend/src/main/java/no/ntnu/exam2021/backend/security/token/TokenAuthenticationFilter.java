package no.ntnu.exam2021.backend.security.token;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Collections;
import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class TokenAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final TokenConfig tokenConfig;
  private final SecretKey secretKey;

  public TokenAuthenticationFilter(AuthenticationManager authenticationManager, TokenConfig tokenConfig, SecretKey secretKey) {
    this.authenticationManager = authenticationManager;
    this.tokenConfig = tokenConfig;
    this.secretKey = secretKey;
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

    try {

      TokenAuthenticationRequest authenticationRequest = new ObjectMapper()
          .readValue(request.getInputStream(), TokenAuthenticationRequest.class);

      Authentication authentication = new UsernamePasswordAuthenticationToken(
          authenticationRequest.getUsername(),
          authenticationRequest.getPassword()
      );

      return authenticationManager.authenticate(authentication);

    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
