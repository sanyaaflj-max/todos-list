import React, { useState, useRef, useEffect, useContext } from "react";
import { TodoContext } from "../context/TodoContext"; 

export const AddTodo = () => {
  const context = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // This safety check prevents the "Cannot destructure property 'addTodo' of undefined" error
  if (!context) return null;
  const { addTodo } = context;

  const submit = (e) => {
    e.preventDefault();
    if (!title || !desc) { 
      alert("Title and Description are required!"); 
      return; 
    }
    addTodo(title, desc, priority, dueDate);
    setTitle(""); 
    setDesc("");
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="form-container">
      <form onSubmit={submit} className="todo-form">
        <h3 className="text-center" style={{color: "#ff4d8d"}}>Create New Task</h3>
        
        <input 
          ref={inputRef} 
          type="text" 
          className="form-control mb-2" 
          placeholder="Task Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Task Description" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
        />
        
        <div className="d-flex gap-2 mb-2">
          <select 
            className="form-select" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          
          <input 
            type="date" 
            className="form-control" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
          />
        </div>
        
        <button type="submit" className="add-btn w-100">+ Add Task</button>
      </form>
    </div>
  );
};