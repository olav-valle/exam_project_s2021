package no.ntnu.exam2021.backend.security;

import static no.ntnu.exam2021.backend.security.UserRole.ADMIN;


import javax.crypto.SecretKey;
import no.ntnu.exam2021.backend.security.token.TokenAuthenticationFilter;
import no.ntnu.exam2021.backend.security.token.TokenConfig;
import no.ntnu.exam2021.backend.security.token.TokenVerifyer;
import no.ntnu.exam2021.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

  private final PasswordEncoder passwordEncoder;
  private final UserService userService;
  private final SecretKey secretKey;
  private final TokenConfig tokenConfig;

  @Autowired
  public ApplicationSecurityConfig(PasswordEncoder passwordEncoder,
                                   UserService userService, SecretKey secretKey, TokenConfig tokenConfig) {
    this.passwordEncoder = passwordEncoder;
    this.userService = userService;
    this.secretKey = secretKey;
    this.tokenConfig = tokenConfig;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http
        .csrf()
        .disable()
//        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
        .sessionManagement()
        // JWT are "stateless", in that they don't reside on the server.
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        // We've defined our own filters to handle JWT auth and verification.
        .addFilter(
            new TokenAuthenticationFilter(
                authenticationManager(),
                tokenConfig,
                secretKey))
        .addFilterAfter(new TokenVerifyer(secretKey, tokenConfig), TokenAuthenticationFilter.class)
        .authorizeRequests()
        //TODO: Stop serving app through Spring? Is it needed, since Spring can't actually control SPA's?


        .antMatchers("/").permitAll()
        //We define API restrictions here.
        .antMatchers(HttpMethod.GET, "/api/items/**").permitAll()
        .antMatchers( "/api/items/**").hasRole(ADMIN.name())
        .antMatchers(HttpMethod.POST, "/api/items/**").hasRole(ADMIN.name())
        .antMatchers(HttpMethod.PUT, "/api/items/**").hasRole(ADMIN.name())
        .antMatchers(HttpMethod.PATCH, "/api/items/**").hasRole(ADMIN.name())
//        .antMatchers("/*", "/ducks/*", "/index.html", "/static/css/**", "/static/js/**").permitAll()
//        .antMatchers("/**")

        .anyRequest().authenticated();

        //We handle login from the App, and POST to /login
//        .and()
//
//        .formLogin()
//        .permitAll()
//        .defaultSuccessUrl("/#/")
//

        //No such thing as logging out with JWTs.
//        .logout()
//        .logoutUrl("/logout")
//        .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
//        .clearAuthentication(true)
//        .invalidateHttpSession(true)
//        .deleteCookies("JSESSIONID", "remember-me")
//        .logoutSuccessUrl("/login");
//        .httpBasic();
  }
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(daoAuthenticationProvider());
  }

  @Bean
  public DaoAuthenticationProvider daoAuthenticationProvider() {

    // Here we create a Data Access Object auth provider
    // using our self-defined ApplicationUserService (which
    // implements spring.UserDetailsService)
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

    provider.setPasswordEncoder(passwordEncoder);
    provider.setUserDetailsService(userService);

    return provider;
  }
}
