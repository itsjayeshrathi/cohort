import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  function onAdd() {
    if (todo.trim() === "") return; 
    setTodoList([...todoList, todo]); 
    setTodo(""); 
  }

  return (
    <div>
      <h1>Todo-App</h1>
      <div>
        <input
          type="text"
          value={todo} 
          onChange={(e) => setTodo(e.target.value)} 
        />
        <button onClick={onAdd}>Add</button>
      </div>
      <div>
        <ol>
          {todoList.map((todo, index) => (
            <li key={index}>{todo}</li> 
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
