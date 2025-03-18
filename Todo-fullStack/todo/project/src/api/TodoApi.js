import axios from "axios";
import { client } from "./ApiClient";

export function retrieveTodosForUsername(username) {
  return client.get(`/users/${username}/todos`);
}

export function deleteTodoById(username, id) {
    return client.delete(`/users/${username}/todos/${id}`);
}

export const retrieveTodoApi = (username, id) =>
  client.get(`/users/${username}/todos/${id}`);

export const updateTodoApi = (username, id, todos) =>
  client.put(`/users/${username}/todos/${id}`, todos);

export const AddTodoApi = (username, todos) =>
  client.post(`/users/${username}/todos`, todos);
