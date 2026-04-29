import React, { useContext, useState, useDeferredValue, useMemo } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoItem } from "./TodoItem";

export const Todos = () => {
  const context = useContext(TodoContext);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // 1. Move useMemo ABOVE the safety check
  const filteredTodos = useMemo(() => {
    // We add a safety check inside the memo instead
    const list = context?.todos || [];
    return list.filter((todo) =>
      todo.title.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [context?.todos, deferredQuery]);

  // 2. NOW you can do your early returns
  if (!context || !context.todos) {
    return <div className="container mt-3">Loading Tasks...</div>;
  }

  const { todos, deleteTodo, toggleTodo } = context;

  return (
    <div className="container" style={{ minHeight: "70vh" }}>
      <h3 className="my-3">Todos List</h3>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search your tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div style={{
        opacity: query !== deferredQuery ? 0.6 : 1,
        transition: "opacity 0.2s ease"
      }}>
        {filteredTodos.length === 0 ? (
          <div className="alert alert-info">
            {todos.length === 0 ? "No Todos to display" : "No matches found"}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onDelete={deleteTodo} 
              onToggle={toggleTodo} 
            />
          ))
        )}
      </div>
    </div>
  );
};