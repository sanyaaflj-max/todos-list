import React, { useState, useEffect } from "react"; // 1. Added useEffect here
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import { About } from "./MyComponents/About";

import "./App.css";

function App() {
  // 2. USESTATE with initializer function to LOAD from LocalStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // 3. USEEFFECT to SAVE to LocalStorage whenever 'todos' array changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const editTodo = (id, title, desc) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, title, desc } : todo));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Router>
        <Header title="My Todos" searchQuery={searchQuery} onSearchChange={setSearchQuery} darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<><AddTodo addTodo={addTodo} /><Todos todos={filteredTodos} onDelete={deleteTodo} onToggle={toggleTodo} onEdit={editTodo} /></>} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;