import React, { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoContext } from "./context/TodoContext"; 

import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import { About } from "./MyComponents/About";
import "./App.css";

// 1. Reducer logic stays outside the component
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
    default:
      return state;
  }
};

function App() {
  // 2. State Management with useReducer
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // 3. Side Effect for LocalStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 4. Memoized Actions (useCallback)
  const addTodo = useCallback((title, desc, priority, dueDate) => {
    const newTodo = { id: Date.now(), title, desc, priority, dueDate, done: false };
    dispatch({ type: "ADD", payload: newTodo });
  }, []);

  const deleteTodo = useCallback((id) => dispatch({ type: "DELETE", payload: id }), []);
  const toggleTodo = useCallback((id) => dispatch({ type: "TOGGLE", payload: id }), []);

  // 5. Performance optimization for Search (useMemo)
  const filteredTodos = useMemo(() => {
    return todos.filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todos, searchQuery]);

  // 6. SINGLE RETURN STATEMENT
  return (
    <TodoContext.Provider value={{ todos: filteredTodos, addTodo, deleteTodo, toggleTodo }}>
      <div className={`app-container ${darkMode ? "dark" : ""}`}>
        <Router>
          <Header 
            title="TaskMate" 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
          />
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
      </div>
    </TodoContext.Provider>
  );
}

export default App;