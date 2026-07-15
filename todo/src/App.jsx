import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import "./App.css";
import { v4 as uuid } from "uuid";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { id: uuid(), task: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleCompleted = (id) => {
    const updatedTodos = todos.map((obj) => {
      if (obj.id === id) {
        return { ...obj, completed: !obj.completed };
      }
      return obj;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((obj) => obj.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  //hook
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <h1 className="heading font">TODO</h1>

      <h6 className="font">Manage your day!</h6>

      <form onSubmit={handleSubmit} className="form">
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">
          <Plus className="icon" />
        </button>
      </form>

      <div className="todos_container">
        {todos.length === 0 && (
          <div className="tips">
            Add Your First To-Do Item! <br />
            📝 Usage Tips 💡: <br /> ✔️ Press Enter to submit actions. <br /> ✔️ Drag to reorder your to-dos (PC only) <br />{" "}
            ✔️ Double-click to edit slogan and tasks. <br /> ✔️ Access quick actions in the right sidebar. <br /> 🔒 Your
            data is stored locally in your browser. <br /> 📝 Supports data download and import.
          </div>
        )}

        {todos.map((todo, index) => {
          return (
            <div key={index} className="todo_item">
              <input checked={todo.completed} type="radio" onChange={() => handleCompleted(todo.id)} />
              <p>{todo.task}</p>
              <Trash2 onClick={() => handleDelete(todo.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;