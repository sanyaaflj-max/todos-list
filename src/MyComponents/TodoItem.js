import React from "react";

export const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="todo-card">

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.done || false}
        onChange={() => onToggle(todo.id)}
      />

      {/* Text Content */}
      <div className={`todo-text ${todo.done ? "done" : ""}`}>
        <div className="todo-title">
          {todo.title || "No Title"}
        </div>

        <div className="todo-desc">
          {todo.desc || "No Description"}
        </div>
      </div>

      {/* Delete Button */}
      <button
        className="delete-btn"
        onClick={() => onDelete(todo)}
      >
        Delete
      </button>

    </div>
  );
};