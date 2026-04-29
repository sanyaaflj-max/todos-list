import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoItem } from "./TodoItem";

export const Todos = () => {
  // 1. Grab the context data
  const context = useContext(TodoContext);

  // 2. Add the safety guard (very important!)
  if (!context || !context.todos) {
    return <div className="container mt-3">Loading Tasks...</div>;
  }

  const { todos, deleteTodo, toggleTodo } = context;

  // 3. You MUST have a return statement here
  return (
    <div className="container" style={{ minHeight: "70vh" }}>
      <h3 className="my-3">Todos List</h3>
      {todos.length === 0 ? (
        <div className="alert alert-info">No Todos to display</div>
      ) : (
        todos.map((todo) => {
          return (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onDelete={deleteTodo} 
              onToggle={toggleTodo} 
            />
          );
        })
      )}
    </div>
  ); // 4. Close your return here
};