package no.ntnu.exam2021.backend.security;

import static no.ntnu.exam2021.backend.security.UserPermission.ITEM_WRITE;
import static no.ntnu.exam2021.backend.security.UserRole.ADMIN;


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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

  private final PasswordEncoder passwordEncoder;

  private final UserService userService;

  @Autowired
  public ApplicationSecurityConfig(PasswordEncoder passwordEncoder, UserService userService) {
    this.passwordEncoder = passwordEncoder;
    this.userService = userService;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http
        .csrf()
        .disable()
//        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
        .authorizeRequests()
//        .antMatchers("/admin").hasRole(ADMIN.name())
//        .antMatchers("/*", "/ducks/*", "/index.html", "/static/css/**", "/static/js/**")

        .antMatchers(HttpMethod.GET, "/api/items/**").permitAll()
        .antMatchers(HttpMethod.DELETE, "/api/items/**").hasRole(ADMIN.name())
        .antMatchers(HttpMethod.POST, "/api/items/**").hasRole(ADMIN.name())
        .antMatchers(HttpMethod.PUT, "/api/items/**").hasRole(ADMIN.name())
        .antMatchers(HttpMethod.PATCH, "/api/items/**").hasRole(ADMIN.name())
        .antMatchers("/**")
        .permitAll()
        .anyRequest().authenticated()
        .and()
        .formLogin()
//        .defaultSuccessUrl("/admin")
        .permitAll()
        .and()
        .logout()
        .logoutUrl("/logout")
        .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
        .clearAuthentication(true)
        .invalidateHttpSession(true)
        .deleteCookies("JSESSIONID", "remember-me")
        .logoutSuccessUrl("/");
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
