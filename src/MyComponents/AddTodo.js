import React, { useState, useRef, useEffect } from "react";

export const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  // ✅ create ref
  const inputRef = useRef(null);

  // ✅ focus input on load
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submit = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      alert("Title or Description cannot be empty");
      return;
    }

    addTodo(title, desc,priority,dueDate);
    setTitle("");
    setDesc("");
    setPriority("Low");
    setDueDate("");

    // ✅ focus again after adding
    inputRef.current.focus();
  };

  return (
    <form onSubmit={submit} className="container">
      
      {/* Title input with ref */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      
      
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">➕ Add</button>
    </form>
  );
};