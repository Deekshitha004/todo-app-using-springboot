package com.example.todo_backend.service;

import com.example.todo_backend.model.Todo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Service
public class TodoService {
    private static final Logger logger = LoggerFactory.getLogger(TodoService.class);
    private static int todosCount = 0;
    private static List<Todo> todos = new ArrayList<>();

    static {
        todos.add(new Todo(++todosCount, "hank", "Play Badminton", LocalDate.now().plusYears(1), false));
        todos.add(new Todo(++todosCount, "jenny", "Complete my spring course", LocalDate.now().plusYears(1), false));
        todos.add(new Todo(++todosCount, "Venice", "Cook pasta", LocalDate.now().plusYears(1), false));
        todos.add(new Todo(++todosCount, "jack", "Go to swim", LocalDate.now().plusYears(1), false));
        todos.add(new Todo(++todosCount, "jack", "Sort the shelf", LocalDate.now().plusYears(1), false));
    }

    public List<Todo> findByUsername(String username) {
        return todos.stream()
                .filter(todo -> todo.getUsername().equalsIgnoreCase(username))
                .toList();
    }

    public void addTodo(String username, String description, LocalDate targetDate, boolean done) {
        Todo todo = new Todo(++todosCount, username, description, targetDate, done);
        todos.add(todo);
    }

    public void deleteTodo(int id) {
        todos.removeIf(todo -> todo.getId() == id);
    }

    public Todo findById(int id) {
        return todos.stream()
                .filter(todo -> todo.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public Todo updateTodo(Todo todo) {
        Todo existingTodo = findById(todo.getId());
        if (existingTodo != null) {
            existingTodo.setDescription(todo.getDescription());
            existingTodo.setTargetDate(todo.getTargetDate());
            existingTodo.setDone(todo.isDone());
        }
        return existingTodo;
    }

    public List<Todo> AllUsers() {
        return todos; // Return all todos for all users
    }


}
