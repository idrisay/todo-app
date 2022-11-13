import "./Main.css";
import { useState } from "react";

const Main = () => {
  let [todoName, setTodoName] = useState("");
  let [todoList, setTodoList] = useState([
    { id: 1, todoName: "Learn React", completed: false }, // -> item
    { id: 2, todoName: "Learn JS", completed: true }, // -> item
    { id: 3, todoName: "Learn HTML", completed: false }, // -> item
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit", e.target[0].value);
    // Reactjs degisken degistirme
    // setTodoName(e.target[0].value);
    // JS degisken degistirme
    // todoName = e.target[0].value
    let newTodo = {
      id: new Date().getTime(),
      todoName: e.target[0].value,
      completed: false,
    };
    console.log(newTodo);
    setTodoList([...todoList, newTodo]);
    setTodoName("");
  };

  const handleCompleted = (id) => {
    const newTodoList = todoList.map((item) => {
      if (id === item.id) {
        item.completed = !item.completed;
        return item;
      } else {
        return item;
      }
    });
    setTodoList(newTodoList);
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <input
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          type="text"
          placeholder="Add todo"
        />
      </form>
      <div className="todo-list">
        {todoList.map((item) => (
          <div key={item.id}>
            <p>{item.todoName}</p>
            <div>
              {item.completed ? (
                <div>
                  <i className="ri-close-line"></i>
                  <i
                    onClick={() => handleCompleted(item.id)}
                    className="ri-checkbox-line"
                  ></i>
                </div>
              ) : (
                <i
                  onClick={() => handleCompleted(item.id)}
                  className="ri-checkbox-blank-line"
                ></i>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
