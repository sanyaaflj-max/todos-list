import React from "react";
import { TodoItem } from "./TodoItem";

export const Todos = ({ todos, onDelete, onToggle, onEdit }) => {  return (
    <div className="container">
      <h3>Todos List</h3>

      {todos.length === 0 ? (
        <p>No Todos to display</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};