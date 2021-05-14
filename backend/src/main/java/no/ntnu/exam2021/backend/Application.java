package no.ntnu.exam2021.backend;

import java.security.Principal;
import no.ntnu.exam2021.backend.item.Item;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@SpringBootApplication
@RestController
@ConfigurationPropertiesScan
//		("no.ntnu.exam2021.backend.security.token")
public class Application implements RepositoryRestConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}


	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		config.exposeIdsFor(Item.class);
	}

	@RequestMapping("/user")
	public Principal user(Principal user) {
		return user;
	}
}
