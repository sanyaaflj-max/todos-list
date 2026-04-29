import React, { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoContext } from "./context/TodoContext"; // Check this path!

import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import { About } from "./MyComponents/About";
import "./App.css";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD": return [...state, action.payload];
    case "DELETE": return state.filter(t => t.id !== action.payload);
    case "TOGGLE": return state.map(t => t.id === action.payload ? { ...t, done: !t.done } : t);
    default: return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((title, desc, priority, dueDate) => {
    const newTodo = { id: Date.now(), title, desc, priority, dueDate, done: false };
    dispatch({ type: "ADD", payload: newTodo });
  }, []);

  const deleteTodo = useCallback((id) => dispatch({ type: "DELETE", payload: id }), []);
  const toggleTodo = useCallback((id) => dispatch({ type: "TOGGLE", payload: id }), []);

  const filteredTodos = useMemo(() => {
    return todos.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [todos, searchQuery]);

 return (
  <TodoContext.Provider value={{ todos: filteredTodos, addTodo, deleteTodo, toggleTodo }}>
    <Router>
      <Header title="TaskMate" searchQuery={searchQuery} onSearchChange={setSearchQuery} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <AddTodo /> 
              <Todos />
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  </TodoContext.Provider>
);
// ... rest of your code
  return (
    <TodoContext.Provider value={{ todos: filteredTodos, addTodo, deleteTodo, toggleTodo }}>
      <div className={`app-container ${darkMode ? "dark" : ""}`}>
        <Router>
           {/* ... your components */}
        </Router>
      </div>
    </TodoContext.Provider>
  ); // <--- This line is likely what's causing the error if brackets above are missing
} // <--- You might be missing this closing brace for the App function!

export default App;