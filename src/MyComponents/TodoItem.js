import React from "react";

export const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="todo-card">
      {/* Checkbox for Toggle */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)} // Correctly passing ID
      />

      {/* Text Content */}
      <div className={`todo-text ${todo.done ? "done" : ""}`}>
        <div className="todo-title">{todo.title}</div>
        <div className="todo-desc">{todo.desc}</div>

        <div className="todo-extra">
          <span className={`priority ${todo.priority?.toLowerCase()}`}>
            {todo.priority}
          </span>

          {todo.dueDate && (
            <span className="date">
              📅 {todo.dueDate}
            </span>
          )}
        </div>
      </div>

      {/* Delete Button - UPDATED to pass todo.id */}
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)} // 👈 Changed from todo to todo.id
      >
        Delete
      </button>
    </div>
  );
};