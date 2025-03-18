import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { AddTodoApi, retrieveTodoApi, updateTodoApi } from '../api/TodoApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const TodoComp = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const username = authContext.username;
    const [todo, setTodo] = useState(null);

    function retrieveTodo() {
        if (id != -1) { // Fetch todo only if `id` is not -1
            retrieveTodoApi(username, id)
                .then(response => setTodo(response.data))
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        retrieveTodo();
    }, [id]);

    function onSubmit(values) {
        console.log("Form Submitted:", values);
        const todo = {
            id: id != -1 ? parseInt(id) : null, // Include the id for updates
            username: username, // Include the username
            description: values.description,
            targetDate: values.targetDate,
            done: false
        };

        if (id == -1) {
            // Add a new todo
            AddTodoApi(username, todo)
                .then(response => {
                    console.log("Todo added:", response.data);
                    navigate('/todos'); // Navigate back to the ListTodo page
                })
                .catch(error => console.log(error));
        } else {
            // Update an existing todo
            updateTodoApi(username, id, todo)
                .then(response => {
                    console.log("Todo updated:", response.data);
                    navigate('/todos'); // Navigate back to the ListTodo page
                })
                .catch(error => console.log(error));
        }
    }

    function validate(values) {
        let errors = {};

        if (values.description.length < 5) {
            errors.description = "Enter at least 5 characters";
        }
        if (!values.targetDate) {
            errors.targetDate = "Enter a valid date";
        } else if (new Date(values.targetDate) < new Date()) {
            errors.targetDate = "Enter a future date";
        }
        console.log(values);
        return errors;
    }

    return (
        <div>
            <div className='container'>
                <h1>Todo Details</h1>
                <Formik
                    initialValues={{
                        description: todo ? todo.description : '',
                        targetDate: todo ? todo.targetDate : ''
                    }}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {() => (
                        <Form>
                            <ErrorMessage
                                name='description'
                                component='div'
                                className='alert alert-warning'
                            />
                            <ErrorMessage
                                name='targetDate'
                                component='div'
                                className='alert alert-warning'
                            />
                            <div className='form-group'>
                                <label htmlFor='description'>Description</label>
                                <Field
                                    type='text'
                                    className='form-control'
                                    name='description'
                                    id='description'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='targetDate'>Target Date</label>
                                <Field
                                    type='date'
                                    className='form-control'
                                    name='targetDate'
                                    id='targetDate'
                                />
                            </div>
                              <button type='submit' className='btn btn-primary'>
                                {id == -1 ? 'Add' : 'Update'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default TodoComp;