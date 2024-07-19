
import React, {useState} from 'react'
import { BiCheckDouble, BiEditAlt , BiTrash, BiCheckCircle, BiReset, BiRefresh, BiSolidAddToQueue } from "react-icons/bi";
function Todolist() {
    const [todos, settodos] = React.useState([]);
    const [inputvalue, setinputvalue] = React.useState('');
    const [editindex, seteditindex] = React.useState(-1);

    const addtodo = () => {
      if (inputvalue.trim() !== '') {
        if (editindex !== -1) {
          const updatedtodos = [...todos];
          updatedtodos[editindex] = { task: inputvalue, completed: updatedtodos[editindex].completed };
          settodos(updatedtodos);
          setinputvalue('');
          seteditindex(-1);
        } else {
          settodos([...todos, { task: inputvalue, completed: false }]);
          setinputvalue('');
        }
      }
    };

    const startedit = (index) => {
      setinputvalue(todos[index].task);
      seteditindex(index);
    };

    const canceledit = () => {
      setinputvalue('');
      seteditindex(-1);
    };

    const removetodo = (index) => {
      const updatedtodos = todos.filter((_, i) => i !== index);
      settodos(updatedtodos);
    };

    const togglecompleted = (index) => {
      const updatedtodos = [...todos];
      updatedtodos[index].completed = !updatedtodos[index].completed;
      settodos(updatedtodos);
    };

    return (
      <div className="todo-container">
        <h1>To-do list</h1>
        <div className="input-section">
          <input
            type="text"
            value={inputvalue}
            onChange={(e) => setinputvalue(e.target.value)}
            placeholder="Enter a new task......................"
            className="input-field"
          />
          {editindex !== -1 ? (
            <>
              <button onClick={addtodo} className="update-btn">
                <BiCheckDouble />
              </button>
              <button onClick={canceledit} className="cancel-btn">
                <BiRefresh />
              </button>
            </>
          ) : (
            <button onClick={addtodo} className="add-btn">
              <BiSolidAddToQueue />
            </button>
          )}
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? 'completed' : ''}>
              {todo.task}
              <div className="btn-group">
                <button onClick={() => startedit(index)} className="btn-edit">
                  <BiEditAlt />
                </button>
                <button onClick={() => removetodo(index)} className="btn-remove">
                  <BiTrash />
                </button>
                <button className="btn-done" onClick={() => togglecompleted(index)}>
                  {todo.completed ? <BiReset /> : <BiCheckCircle />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
export default Todolist