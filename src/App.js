import React, { useState, useEffect,useMemo,useCallback} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import { About } from "./MyComponents/About";
import "./App.css";

function App() {
  // 💾 Load from localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ➕ Add Todo
  const addTodo = useCallback((title, desc) => {
  const newTodo = {
    id: Date.now(),
    title,
    desc,
    done: false,
  };
  setTodos(prev => [...prev, newTodo]);
}, []);

  // ❌ Delete
  const deleteTodo = useCallback((todo) => {
  setTodos(prev => prev.filter((e) => e !== todo));
}, []);
  
  // ✅ Toggle
  const toggleTodo = useCallback((id) => {
  setTodos(prev =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  );
}, []);

  // ✏️ Edit
  const editTodo = (id, title, desc) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, desc } : todo
      )
    );
  };

  // 🔍 Search
  const filteredTodos = useMemo(() => {
  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [todos, searchQuery]);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Router>

        {/* HEADER */}
        <Header
          title="My Todos"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* MAIN CONTENT */}
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

        {/* FOOTER */}
        <Footer />

      </Router>
    </div>
  );
}

export default App;