package com.example.todo_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;


@Entity
public class Todo {

    @Id
    @GeneratedValue
    private Integer id;
    private String username;
    @Size(min = 5,message = "Enter atleast 5 letters")
    private String description;
    @FutureOrPresent
    private LocalDate targetDate;
    private boolean done;

    public Todo(){

    }
    public Todo(Integer id, String username, String description, LocalDate targetDate, boolean done) {
        this.id = id;
        this.username = username;
        this.description = description;
        this.targetDate = targetDate;
        this.done = done;
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public String getUsername() { return username; }
    public String getDescription() { return description; }
    public LocalDate getTargetDate() { return targetDate; }
    public boolean isDone() { return done; }

    public void setId(Integer id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setDescription(String description) { this.description = description; }
    public void setTargetDate(LocalDate targetDate) { this.targetDate = targetDate; }
    public void setDone(boolean done) { this.done = done; }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", description='" + description + '\'' +
                ", targetDate=" + targetDate +
                ", done=" + done +
                '}';
    }
}
