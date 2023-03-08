import React from "react";
import "./todo.css";
import { useState } from "react";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="container">
      <h2>Todo App</h2>
      <form className="form-group">
        <input
          type="text"
          value={todo}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        
        <button onClick={addTodo}>Add</button>
      </form>
      <div className="list">
        <ul>
          <li className="form-control">First</li>
          <li className="form-control">Second</li>
          <li className="form-control">Third</li>
        </ul>
      </div>
    </div>
  );
}

export default Todo;
