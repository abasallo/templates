package es.basallo

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class HelloController {

    @RequestMapping(value = "/")

    @ResponseBody hello() { 'Greetings from Spring Boot!' }
}