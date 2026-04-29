import React from "react";
import { Link } from "react-router-dom";

export default function Header({ title, searchQuery, onSearchChange }) {
  return (
    <nav className="navbar">
      <h2>{title}</h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}