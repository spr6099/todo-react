import React from "react";
import "./todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  // every time form render akunna default behavior prevent cheyyan event.preventDefault use cheyyunnu
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
   if (todo !== '') {     //  to prevent empty input
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
    console.log(todos);
    setTodo("");
    }
    if (editId) {
      const editTodo = todos.find((todo)=>todo.id === editId )
      const updateTodo = todos.map((z)=>z.id === editTodo.id
      ? (z = {id : z.id , list : todo})
      : (z = {id : z.id , list : z.list}))
      setTodos(updateTodo)
      setEditId(0);
      setTodo(''); 
    }
  };

  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus(); //input field focus aayi irikkan
  });
  // useEffect(() => {
  //   inputRef.current.focus();
  //  },[]);  //once we use dependancy array-input field focus only initial loading,( dependency - to control infinite loops)

  const onDelete = (id) => {
    setTodos(todos.filter((td) => td.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((x) => {
      if (x.id === id) {
        return { ...x, status: !x.status };
      }
      return x;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((y) => y.id === id);
    console.log("edit" + editTodo.list);
    setTodo(editTodo.list);
    // console.log(editTodo)
    setEditId(editTodo.id);
  };

  return (
    <div className="container">
      <h2>Todo App</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={todo}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />

        <button onClick={addTodo}>{editId ? "Edit" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((td) => (
            <li className="todo-items">
              <div className="todo-list" id={td.status ? "td-ls" : ""}>
                {td.list}
              </div>
              <span>
                <FiEdit
                  className="todo-icons"
                  id="fiedit"
                  title="edit"
                  onClick={() => onEdit(td.id)}
                />
                <IoMdDoneAll
                  className="todo-icons"
                  id="mdcomplete"
                  title="complete"
                  onClick={() => onComplete(td.id)}
                />
                <MdDelete
                  className="todo-icons"
                  id="mddelete"
                  title="delete"
                  onClick={() => onDelete(td.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
