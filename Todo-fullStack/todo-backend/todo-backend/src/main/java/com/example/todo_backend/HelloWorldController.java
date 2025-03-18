package com.example.todo_backend;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/helloWorld")
    public String HelloWorld(){
        return "hello";
    }
    //path-parameters:todos/{id}
    @GetMapping("/hello/{name}")
    public HelloWorldBean helloWorldPath(@PathVariable String name){
        return new HelloWorldBean("hello world:"+name);
    }
    @GetMapping("/basicauth")
    public String basicAuthCheck(){
        return "success";
    }
}
