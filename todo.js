import React, {Component } from 'react';
import { getSession } from './main';
import './todo.css';

// Assuming callApi is a function for making HTTP requests
const callApi = async (method, url, data) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: data
        });
        return response;
    } catch (error) {
        throw new Error('Failed to fetch data from server');
    }
};

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodoText: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({ newTodoText: event.target.value });
    };

    handleAddTodo = () => {
        const { todos, newTodoText } = this.state;
        if (newTodoText.trim() !== '') {
            const newTodo = {
                id: todos.length + 1,
                text: newTodoText.trim(),
                completed: false
            };
            this.setState({
                todos: [...todos, newTodo],
                newTodoText: ''
            }, () => {
                this.TodoRegister(newTodo);
            });
        }
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleAddTodo();
        }
    };

    handleDeleteTodo = (id) => {
        const { todos } = this.state;
        const updatedTodos = todos.filter(todo => todo.id !== id);
        this.setState({ todos: updatedTodos });
    };

    handleToggleCompletion = (id) => {
        this.setState(prevState => ({
            todos: prevState.todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        }));
    };

    TodoRegister = async (newTodo) => {
        const url = 'http://localhost:5000/Todoregistration/submit';
        const data = JSON.stringify({
            MYtodo: newTodo.text,
            emailid : getSession("sid")
        });

        try {
            const response = await callApi('POST', url, data);

            if (!response.ok) {
                throw new Error('Failed to add todo');
            }

            // Optionally handle success response

        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    render() {
        const { todos, newTodoText } = this.state;

        return (
            <div className="todocontainer">
                <h1>Todo List</h1>
                <div>
                    <input
                        type="text"
                        value={newTodoText}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        placeholder="Enter new todo"
                        className="todoinput"
                    />
                    <button onClick={this.handleAddTodo} className="todobutton">Add Todo</button>
                </div>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => this.handleToggleCompletion(todo.id)}
                                className="todocheckbox"
                            />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                            <button
                                onClick={() => this.handleDeleteTodo(todo.id)}
                                style={{ cursor: 'pointer', marginLeft: '10px' }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;
