package com.example.todo_backend.controller;

import com.example.todo_backend.model.Todo;
import com.example.todo_backend.repository.TodoRepository;
import com.example.todo_backend.service.TodoService;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/users")
public class TodoResource {

    private static final Logger logger = LoggerFactory.getLogger(TodoResource.class);
    private TodoService service;
    public TodoRepository repository;

    public TodoResource(TodoService service, TodoRepository repository) {
        this.service = service;
        this.repository=repository;
    }

    @GetMapping("/{username}/todos")
    public List<Todo> retrieveTodos(@PathVariable String username){
        logger.info("GET /users endpoint hit");
        //return service.findByUsername(username);
        return repository.findByUsername(username);
    }

    @GetMapping("/{username}/todos/{id}")
    public Todo retrieveTodosById(@PathVariable String username,@PathVariable Integer id){
        //return service.findById(id);
        return repository.findById(id).get();
    }

    @GetMapping({"", "/"})  // This will match both /users and /users/
    public List<Todo> retrieveAllUsers() {
        System.out.println("GET /users endpoint hit");
        //return service.AllUsers();
        return repository.findAll();
    }
    @DeleteMapping("/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodosById(@PathVariable String username, @PathVariable Integer id){
        //service.deleteTodo(id);
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{username}/todos/{id}")
    public Todo updateById(@PathVariable String username, @PathVariable Integer id, @Valid @RequestBody Todo todo){
        //return service.updateTodo(todo);
        return repository.save(todo);
        //return ResponseEntity.noContent().build();
    }

    @PostMapping("/{username}/todos")
    public ResponseEntity<Void> addNewTodo(@PathVariable String username,@Valid @RequestBody Todo todo) {
        todo.setUsername(username);
        todo.setId(null);
        //service.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.isDone());
        repository.save(todo);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
