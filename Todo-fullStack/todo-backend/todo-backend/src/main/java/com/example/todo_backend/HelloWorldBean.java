package com.example.todo_backend;

public class HelloWorldBean {
    private String m;

    public  HelloWorldBean(String m){
        this.m=m;
    }

    public String getM() {
        return m;
    }

    public void setM(String m) {
        this.m = m;
    }

    @Override
    public String toString() {
        return "HelloWorldBean{" +
                "m='" + m + '\'' +
                '}';
    }
}

