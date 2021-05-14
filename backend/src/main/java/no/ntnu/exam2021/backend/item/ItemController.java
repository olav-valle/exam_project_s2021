//package no.ntnu.exam2021.backend.item;
//
//import java.util.Optional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
////@CrossOrigin
//@Controller
////@RequestMapping(value = "/api/items")
//public class ItemController {
//
//  private final ItemRepository itemRepository;
//
//  @Autowired
//  public ItemController(ItemRepository itemRepository) {
//    this.itemRepository = itemRepository;
//  }
//
//  public Optional<Item> getItem(Long id){
//    return itemRepository.findById(id);
//  }
//}
