import React, { useEffect, useState, useContext } from 'react';
import { retrieveTodosForUsername, deleteTodoById } from '../api/TodoApi';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const ListTodo = () => {
    const [todos, setTodos] = useState([]);
    const auth = useContext(AuthContext);
    const username = auth.username;
    const navigate = useNavigate();

    useEffect(() => {
        getTodos();
    }, []);

    function getTodos() {
        retrieveTodosForUsername(username)
            .then((response) => {
                console.log(response);
                setTodos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteTodo(id) {
        deleteTodoById(username, id)
            .then((response) => {
                console.log(response);
                getTodos(); // Refresh the list after deletion
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function updateTodo(id) {
        console.log("updateTodo");
        navigate(`/todo/${id}`);
    }

    function AddTodo() {
        console.log("Add todo");
        navigate('/todo/-1'); // Navigate to the Add Todo page
    }

    return (
        <div>
            <h1>Things To Do</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Work Completed?</th>
                        <th>Target Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                        const targetDate = new Date(todo.targetDate);
                        return (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>
                                    {targetDate instanceof Date && !isNaN(targetDate)
                                        ? targetDate.toDateString()
                                        : 'Invalid Date'}
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <button className='btn btn-primary' onClick={AddTodo}>Add New todo</button>
            </div>
        </div>
    );
};

export default ListTodo;