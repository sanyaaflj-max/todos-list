import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import { About } from "./MyComponents/About";

import "./App.css";

function App() {
  // 1. Simple State management for Todos
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // 2. Add Todo function using basic state update
  const addTodo = (title, desc, priority, dueDate) => {
    const newTodo = {
      id: Date.now(),
      title,
      desc,
      priority: priority || "Low",
      dueDate: dueDate || "",
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  // 3. Delete Todo function
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // 4. Toggle Todo status
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  // 5. Edit Todo function
  const editTodo = (id, title, desc) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title, desc } : todo
    );
    setTodos(updatedTodos);
  };

  // 6. Simple Search filtering (No useMemo)
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Router>
        <Header
          title="My Todos"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AddTodo addTodo={addTodo} />
                  <Todos
                    todos={filteredTodos}
                    onDelete={deleteTodo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                  />
                </>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;