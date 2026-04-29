import React, { useState, useEffect, useMemo, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import { About } from "./MyComponents/About";

import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch (error) { return []; }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ USECALLBACK: Prevents re-creating functions unless 'todos' changes
  const addTodo = useCallback((title, desc, priority, dueDate) => {
    const newTodo = {
      id: Date.now(),
      title, desc, priority: priority || "Low", dueDate: dueDate || "", done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo)
    );
  }, []);

  const editTodo = useCallback((id, title, desc) => {
    setTodos((prev) =>
      prev.map((todo) => todo.id === id ? { ...todo, title, desc } : todo)
    );
  }, []);

  // ✅ USEMEMO: Only filters the list when 'todos' or 'searchQuery' actually change
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todos, searchQuery]);

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