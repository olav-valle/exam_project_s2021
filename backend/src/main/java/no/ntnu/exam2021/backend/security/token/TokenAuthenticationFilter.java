package no.ntnu.exam2021.backend.security.token;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
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

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String token = Jwts.builder()
                .setSubject(authResult.getName())
                .claim("authorities", authResult.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(Date
                        .from(
                                Calendar
                                        .getInstance()
                                        .toInstant()
                                        .plusSeconds(
                                                (long) tokenConfig
                                                        .getTokenExpirationAfterSeconds()
                                        )
                        )

                )
                .signWith(secretKey)
                .compact();

        response.addHeader(tokenConfig.getAuthorizationHeader(), tokenConfig.getTokenPrefix() + token);
        response.setHeader("Content-Type", "application/json");
//        response.setHeader("access-control-request-headers", "Authorization");
        response.getWriter().append(String.format("{\n\"%1$s\" : \"%2$s\"\n}", (tokenConfig.getAuthorizationHeader()), (tokenConfig.getTokenPrefix() + token)));

    }

    //TODO: Add a unsuccessfulAuthentication?
    // find some way to notify frontend of failed or refused API actions.
}
