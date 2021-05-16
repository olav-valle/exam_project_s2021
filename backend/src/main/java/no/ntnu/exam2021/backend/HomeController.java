package no.ntnu.exam2021.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value="/")
    public String index() {
        return "index";
    }

    @RequestMapping(value="/cart")
    public String cart() {
        return "index";
    }
    @RequestMapping(value="/about")
    public String about() {
        return "index";
    }
    @RequestMapping(value="/admin")
    public String admin() {
        return "index";
    }

//    @RequestMapping(value="/")


}
