import React, { useState, useEffect } from "react";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import Search from "../components/Search";
import Filter from "../components/Filter";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import './TodoListPage.css';

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndTodos = async () => {
      try {
        const userResponse = await fetch("http://localhost:5000/auth/current_user", {
          method: "GET",
          credentials: "include",
        });
        
        if (!userResponse.ok) throw new Error('Failed to fetch user');

        const userData = await userResponse.json();
        setUser(userData);
        setIsAuthenticated(!!userData);

        if (userData) {
          const todosResponse = await fetch("http://localhost:5000/api/todos", {
            method: "GET",
            credentials: "include",
          });

          if (!todosResponse.ok) throw new Error('Failed to fetch todos');

          const todosData = await todosResponse.json();
          setTodos(todosData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        if (error.message === 'Failed to fetch user') {
          navigate('/login');
        }
      }
    };

    fetchUserAndTodos();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        navigate('/login');
        setIsAuthenticated(false);
        setUser(null);
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const addTodo = async (text, category) => {
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text, category }),
      });

      if (!response.ok) throw new Error('Failed to add todo');

      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error('Failed to delete todo');

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const completeTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isCompleted: !todo.isCompleted }),
      });

      if (!response.ok) throw new Error('Failed to update todo');

      const updatedTodo = await response.json();
      setTodos((prevTodos) => prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="mx-auto max-w-md p-10 bg-white rounded-lg pt-8 px-4">
      <Header user={user} onLogout={handleLogout} />
      <div className="max-w-2xl mx-auto mt-8 p-6 shadow-lg bg-white rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-4">Lista de Tarefas</h1>
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
        <div className="todo-list-container mb-5 pb-5 border-b border-gray-400">
          {todos
            .filter((todo) =>
              filter === "All"
                ? true
                : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
            )
            .filter((todo) =>
              todo.text.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) =>
              sort === "Asc"
                ? a.text.localeCompare(b.text)
                : b.text.localeCompare(a.text)
            )
            .map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
              />
            ))}
        </div>
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default TodoListPage;