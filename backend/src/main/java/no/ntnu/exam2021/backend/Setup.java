package no.ntnu.exam2021.backend;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import no.ntnu.exam2021.backend.item.Item;
import no.ntnu.exam2021.backend.item.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

//@Component
@Configuration
public class Setup implements CommandLineRunner {

  private final ItemRepository itemRepository;

  @Autowired
  public Setup(ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  @Override
  public void run(String... args) {
//    this.itemRepository.deleteAll();
//
//
//    this.itemRepository.save(new Item("Linux Duck", 123, "Should be a rubber penguin, to be honest...", "linux-duck.jpg" ));
//    this.itemRepository.save(new Item("Green t-shirt", 200, "Some green t-shirt"));
//    this.itemRepository.save(new Item("Blue Jeans", 230, "Random blue jeans"));
//    this.itemRepository.save(new Item("Red Jeans", 299, "From the J. Vaughan Collection"));
//    this.itemRepository.save(new Item("Orange Jeans", 249, "From the J. Vaughan Collection"));
//    this.itemRepository.save(new Item("Hat", 130, "A cool hat"));
//    this.itemRepository.save(new Item("Awesome Hat", 229, "A really cool hat!"));
//    this.itemRepository.save(new Item("Top Hat", 999, "Really just the best hat we have."));
//    this.itemRepository.save(new Item("Socks", 75, "Socks! Two of them!"));
//    this.itemRepository.save(new Item("Hoodie", 300, "Straight out tha' hood."));
//    this.itemRepository.save(new Item("Black Timberlands", 599, "Catch these!"));
//    this.itemRepository.save(new Item("Air Jordans", 800, "I believe you can fly."));
//    this.itemRepository.save(new Item("Suit", 2300, "Look sharp."));
//    this.itemRepository.save(new Item("My Sweater", 1994, "Hold this thread as I walk away." ));
//





  }
}
