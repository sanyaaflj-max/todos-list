import React, { useState, useRef, useEffect, useContext, useId } from "react";
import { TodoContext } from "../context/TodoContext"; 

export const AddTodo = () => {
  const context = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const inputRef = useRef(null);

  // 1. Generate a unique ID prefix for this form instance
  const id = useId();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

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
        
        {/* 2. Added labels linked to inputs via unique IDs */}
        <div className="mb-2">
          <label htmlFor={id + '-title'} className="visually-hidden">Task Title</label>
          <input 
            id={id + '-title'}
            ref={inputRef} 
            type="text" 
            className="form-control" 
            placeholder="Task Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        
        <div className="mb-2">
          <label htmlFor={id + '-desc'} className="visually-hidden">Task Description</label>
          <input 
            id={id + '-desc'}
            type="text" 
            className="form-control" 
            placeholder="Task Description" 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} 
          />
        </div>
        
        <div className="d-flex gap-2 mb-2">
          <div className="w-50">
            <label htmlFor={id + '-priority'} className="visually-hidden">Priority</label>
            <select 
              id={id + '-priority'}
              className="form-select" 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
          
          <div className="w-50">
            <label htmlFor={id + '-date'} className="visually-hidden">Due Date</label>
            <input 
              id={id + '-date'}
              type="date" 
              className="form-control" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
            />
          </div>
        </div>
        
        <button type="submit" className="add-btn w-100">+ Add Task</button>
      </form>
    </div>
  );
};