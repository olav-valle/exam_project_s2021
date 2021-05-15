package no.ntnu.exam2021.backend.security.token;

import com.google.common.base.Strings;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class TokenVerifyer extends OncePerRequestFilter {

  private final SecretKey secretKey;
  private final TokenConfig tokenConfig;

  public TokenVerifyer(SecretKey secretKey, TokenConfig tokenConfig) {
    this.secretKey = secretKey;
    this.tokenConfig = tokenConfig;
  }


  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {

    String authorisationHeader = request.getHeader(tokenConfig.getAuthorizationHeader());

    //sanity check for existing Auth header with correct prefix
    if ( Strings.isNullOrEmpty( authorisationHeader )
        || !authorisationHeader.startsWith( tokenConfig.getTokenPrefix() ) ) {
      filterChain.doFilter(request, response);
      return;
    }

    //trim off the prefix before we continue parsing
    String token = authorisationHeader.replace(tokenConfig.getTokenPrefix(), "");
    //Kinda risky? What are the odds that the token itself actually contains
    // a substring identical to the prefix? :S
    // It's Base64, so a string like e.g. "Bearer" could technically form... :S
    // Statistically defensible? Yeah, let's go with that..

    try {
      //The Claims of our JWTs contain the authorities that were granted to the user
      // that originally requested the token.
      Jws<Claims> claimsJws = Jwts.parser()
          // use our super secret key to verify the token
      .setSigningKey(secretKey)
          //read the claims stored in the token.
      .parseClaimsJws(token);

      //Grab the JWT payload, which contains the username as sub,
      // and the user's authorities as a JSON-like string.
      Claims body = claimsJws.getBody();

      //The sub claim
      String sub = body.getSubject();


      //The Authorities Claim is shaped like a JSON, so both key and value are strings.
      List<Map<String, String>> authorities = (List<Map<String, String>>) (body.get("authorities"));
      //fixme: rethink this cast? It was recommended by autocomplete... At least double check it.

      // Organise the authoritites extracted from the JWT as SimpleGrantedAuthority objects,
      // the same as our UserRole Enums use.
      Set<SimpleGrantedAuthority> grantedAuthorities = authorities.stream()
          .map(m -> new SimpleGrantedAuthority(m.get("authority")))
          .collect(Collectors.toSet());

      //Create authentication object token from user extracted from JWT,
      // so we can apply it to the current context
      Authentication auth = new UsernamePasswordAuthenticationToken(
          sub,
          null,
          grantedAuthorities
      );

      //We apply the extracted authorities to the current context
      SecurityContextHolder.getContext().setAuthentication(auth);

    } catch (JwtException e ) {
      throw new IllegalStateException("The token " + token + " is invalid.");
    }
    filterChain.doFilter(request, response);


  }
}
